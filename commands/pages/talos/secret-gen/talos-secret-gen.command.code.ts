import { existsSync } from "node:fs"
import { mkdir, mkdtemp, rm, stat } from "node:fs/promises"
import { dirname, join } from "node:path"
import {
  answering,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { DEFAULT_CLUSTER_NAME } from "akasha/infrastructure/cluster/provisioning/talos/nodes/nodes.module.code.ts"
import { clusterSecretsSopsPath } from "akasha/infrastructure/cluster/provisioning/talos/paths/paths.module.code.ts"
import { encryptFile } from "akasha/infrastructure/cluster/provisioning/talos/sops/sops.module.code.ts"
import { runTalosctl } from "akasha/infrastructure/cluster/provisioning/talos/talosctl/talosctl.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const CLUSTER = "--cluster"

export const FORCE = "--force"

const VALUED: readonly string[] = [CLUSTER]

const BARE: readonly string[] = [FORCE]

export type Named = { readonly cluster: string; readonly force: boolean }

export type Read = Named | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const flags = new Map<string, string>()
  let force = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      refusals.push(`\`${one}\` is no word this takes — it takes \`${CLUSTER}\` and \`${FORCE}\``)
      continue
    }
    const cut = one.indexOf("=")
    const name = cut === -1 ? one : one.slice(0, cut)
    if (BARE.includes(name)) {
      if (cut === -1) force = true
      else refusals.push(`\`${name}\` carries no value, and \`${one}\` hands it one`)
      continue
    }
    if (!VALUED.includes(name)) {
      refusals.push(`\`${name}\` is no flag this takes — it takes \`${CLUSTER}\` and \`${FORCE}\``)
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
  if (refusals.length > 0) return { refused: refusals }
  return { cluster: flags.get(CLUSTER) ?? DEFAULT_CLUSTER_NAME, force }
}

export type Generating = (done: string[], read: Named) => Promise<Answer>

async function generated(done: string[], read: Named): Promise<Answer> {
  const destPath = clusterSecretsSopsPath(read.cluster)
  if (existsSync(destPath) && !read.force) {
    return mistaking([
      `a secrets file is already at ${destPath}`,
      `writing it again loses every node's PKI, so \`${FORCE}\` is what says a rotation is meant`,
    ])
  }
  await mkdir(dirname(destPath), { recursive: true })
  const workDir = await mkdtemp(join(SCRATCH_AT, "talos-secrets-gen-"))
  const tmpSecretsPath = join(workDir, "secrets.yaml")
  try {
    await runTalosctl({ args: ["gen", "secrets", "-o", tmpSecretsPath, "--force"] })
    const info = await stat(tmpSecretsPath)
    if (info.size === 0) return refusedBy(["talosctl gen secrets wrote nothing"], OPERATIONAL)
    await encryptFile(tmpSecretsPath, destPath, done)
  } finally {
    await rm(workDir, { recursive: true, force: true })
  }
  return told([`wrote the SOPS-encrypted secrets to ${destPath}`])
}

export async function generatedBy(
  read: Named,
  generating: Generating = generated
): Promise<Answer> {
  return await answering(async (done) => await generating(done, read))
}

export async function talosSecretGen(argv: readonly string[]): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return mistaking(read.refused)
  return await generatedBy(read)
}
