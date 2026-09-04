import { existsSync } from "node:fs"
import { chmod, copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { buildNodePatch } from "@akasha/talos/talos-build-patch"
import { buildSchematic } from "@akasha/talos/talos-build-schematic"
import { buildNodeVolumes } from "@akasha/talos/talos-build-volumes"
import { emitDocumentsYaml, emitPatchYaml, emitSchematicYaml } from "@akasha/talos/talos-emit-yaml"
import { registerSchematic } from "@akasha/talos/talos-factory"
import { getCluster, getNode } from "@akasha/talos/talos-nodes"
import { clusterSecretsSopsPath, clusterTalosconfigPath } from "@akasha/talos/talos-paths"
import { readRegistryCa } from "@akasha/talos/talos-registry-ca"
import type { ClusterIntent, NodeIntent } from "@akasha/talos/talos-schema"
import { decryptToTmp } from "@akasha/talos/talos-sops"
import { runTalosctl } from "@akasha/talos/talosctl"

export const NODE = "--node"

export const IP = "--ip"

export const CLUSTER = "--cluster"

const VALUED: readonly string[] = [NODE, IP, CLUSTER]

const INPUT = 1

const OPERATIONAL = 3

const CONTROL_PLANE = "controlplane"

const WORKER = "worker"

export type Named = {
  readonly node: string
  readonly ip: string
  readonly cluster: string | null
}

export type Read = Named | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const flags = new Map<string, string>()
  const words: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      words.push(one)
      continue
    }
    const cut = one.indexOf("=")
    const name = cut === -1 ? one : one.slice(0, cut)
    if (!VALUED.includes(name)) {
      refusals.push(`\`${name}\` is no flag this takes — it takes \`${VALUED.join("`, `")}\``)
      continue
    }
    if (cut !== -1) {
      flags.set(name, one.slice(cut + 1))
      continue
    }
    const next = argv[at + 1]
    if (next === undefined || next.startsWith("-")) {
      refusals.push(`\`${name}\` names a value, and nothing followed it`)
      continue
    }
    flags.set(name, next)
    at += 1
  }
  const said = words[0]
  if (said !== undefined) {
    if (flags.has(NODE)) {
      refusals.push(`the node is named twice — \`${said}\` as a word and after \`${NODE}\``)
    } else {
      flags.set(NODE, said)
    }
  }
  if (words.length > 1) {
    refusals.push(`this names one node, and ${words.length} words were said`)
  }
  const node = flags.get(NODE)
  if (node === undefined) {
    refusals.push(`this names the node to apply, as a word or after \`${NODE}\``)
  }
  const ip = flags.get(IP)
  if (ip === undefined) refusals.push(`this names \`${IP}\`, and nothing did`)
  if (node === undefined || ip === undefined || refusals.length > 0) return { refused: refusals }
  return { node, ip, cluster: flags.get(CLUSTER) ?? null }
}

async function applying(read: Named, given: Given): Promise<Answer> {
  let node: NodeIntent
  let cluster: ClusterIntent
  let name: string
  try {
    node = getNode(read.node)
    name = read.cluster ?? node.cluster
    cluster = getCluster(name)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: INPUT }
  }

  const secretsPath = clusterSecretsSopsPath(name)
  if (!existsSync(secretsPath)) {
    return {
      report: [],
      refusals: [
        `no cluster secrets stand at ${secretsPath}`,
        `\`${given.calledAs} talos-secrets-gen ${CLUSTER} ${name}\` writes them, and an apply reads them`,
      ],
      code: INPUT,
    }
  }

  const report = [`registering the image factory schematic for ${node.id}`]
  const schematicId = await registerSchematic(emitSchematicYaml(buildSchematic(node)))
  report.push(`schematic id: ${schematicId}`)

  const registryCa = cluster.registryHosts.length > 0 ? readRegistryCa() : undefined
  const patchYaml = emitPatchYaml(buildNodePatch(node, cluster, schematicId, { registryCa }))
  const workDir = await mkdtemp(join(tmpdir(), `talos-apply-${node.id}-`))
  const patchPath = join(workDir, "patch.yaml")
  await writeFile(patchPath, patchYaml)

  const volumesYaml = emitDocumentsYaml(buildNodeVolumes(node))
  const volumesPatch: string[] = []
  if (volumesYaml.length > 0) {
    const volumesPath = join(workDir, "volumes.yaml")
    await writeFile(volumesPath, volumesYaml)
    volumesPatch.push("--config-patch", `@${volumesPath}`)
  }

  const machineType = node.role === WORKER ? WORKER : CONTROL_PLANE
  const appliedFile = `${machineType}.yaml`
  const endpoint =
    cluster.controlPlaneVip !== undefined
      ? `https://${cluster.controlPlaneVip}:6443`
      : `https://${read.ip}:6443`

  let decrypted: string | undefined
  try {
    decrypted = await decryptToTmp(secretsPath)
    await runTalosctl({
      args: [
        "gen",
        "config",
        name,
        endpoint,
        "--with-secrets",
        decrypted,
        "--config-patch",
        `@${patchPath}`,
        ...volumesPatch,
        "--output-types",
        `${machineType},talosconfig`,
        "--output",
        workDir,
        "--force",
      ],
    })
    const persisted = clusterTalosconfigPath(name)
    await mkdir(dirname(persisted), { recursive: true, mode: 0o700 })
    await copyFile(join(workDir, "talosconfig"), persisted)
    await chmod(persisted, 0o600)
    report.push(`wrote the talosconfig to ${persisted}`)
    await runTalosctl({
      args: [
        "apply-config",
        "--insecure",
        "--nodes",
        read.ip,
        "--file",
        join(workDir, appliedFile),
      ],
    })
    report.push(`${node.id} took ${appliedFile} at ${read.ip}`)
  } finally {
    if (decrypted !== undefined) await rm(dirname(decrypted), { recursive: true, force: true })
    await rm(workDir, { recursive: true, force: true })
  }
  return { report, refusals: [], code: 0 }
}

export async function talosApply(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  try {
    return await applying(read, given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
