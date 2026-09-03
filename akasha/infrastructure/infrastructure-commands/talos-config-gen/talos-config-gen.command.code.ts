import { writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { buildNodePatch, PLACEHOLDER_SCHEMATIC_ID } from "@akasha/talos/talos-build-patch"
import { buildNodeVolumes } from "@akasha/talos/talos-build-volumes"
import { emitDocumentsYaml } from "@akasha/talos/talos-emit-yaml"
import { getClusterForNode, getNode } from "@akasha/talos/talos-nodes"
import { readRegistryCa } from "@akasha/talos/talos-registry-ca"
import type { ClusterIntent, NodeIntent } from "@akasha/talos/talos-schema"

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

export function lines(yaml: string): readonly string[] {
  const held = yaml.split("\n")
  while (held.length > 0 && held[held.length - 1] === "") held.pop()
  return held
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
