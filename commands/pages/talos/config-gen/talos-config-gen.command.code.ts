import { writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import {
  buildNodePatch,
  PLACEHOLDER_SCHEMATIC_ID,
} from "akasha/infrastructure/cluster/provisioning/talos/build-patch/build-patch.module.code.ts"
import { buildNodeVolumes } from "akasha/infrastructure/cluster/provisioning/talos/build-volumes/build-volumes.module.code.ts"
import { emitDocumentsYaml } from "akasha/infrastructure/cluster/provisioning/talos/emit-yaml/emit-yaml.module.code.ts"
import {
  getClusterForNode,
  getNode,
} from "akasha/infrastructure/cluster/provisioning/talos/nodes/nodes.module.code.ts"
import { readRegistryCa } from "akasha/infrastructure/cluster/provisioning/talos/registry-ca/registry-ca.module.code.ts"
import type {
  ClusterIntent,
  NodeIntent,
} from "akasha/infrastructure/cluster/provisioning/talos/schema/schema.module.code.ts"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { whyOf } from "../../../modules/fault-saying/fault-saying.module.code.ts"
import { lines } from "../../../modules/yaml-lines/yaml-lines.module.code.ts"

export const NODE = "--node"

export const OUTPUT = "--output"

export const SCHEMATIC_ENV = "TALOS_SCHEMATIC_ID"

const VALUED: readonly string[] = [NODE, OUTPUT]

const INPUT = 1

const OPERATIONAL = 3

export type Named = { readonly node: string; readonly output: string | null }

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
    refusals.push(`this names the node to write for, as a word or after \`${NODE}\``)
  }
  if (node === undefined || refusals.length > 0) return { refused: refusals }
  return { node, output: flags.get(OUTPUT) ?? null }
}

export function schematicSaid(): string {
  const said = process.env[SCHEMATIC_ENV]
  return said === undefined || said === "" ? PLACEHOLDER_SCHEMATIC_ID : said
}

async function writing(read: Named, given: Given): Promise<Answer> {
  let node: NodeIntent
  let cluster: ClusterIntent
  try {
    node = getNode(read.node)
    cluster = getClusterForNode(read.node)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: INPUT }
  }
  const registryCa = cluster.registryHosts.length > 0 ? readRegistryCa() : undefined
  const patch = buildNodePatch(node, cluster, schematicSaid(), { registryCa })
  const yaml = emitDocumentsYaml([patch, ...buildNodeVolumes(node)])
  if (read.output === null) return { report: lines(yaml), refusals: [], code: 0 }
  const at = resolve(given.root, read.output)
  await writeFile(at, yaml)
  return { report: [`wrote ${at}`], refusals: [], code: 0 }
}

export async function talosConfigGen(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  try {
    return await writing(read, given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
