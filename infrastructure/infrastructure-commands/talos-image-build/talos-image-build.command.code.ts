import { writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { buildSchematic } from "@akasha/talos/talos-build-schematic"
import { emitSchematicYaml } from "@akasha/talos/talos-emit-yaml"
import { installerIsoUrl, registerSchematic } from "@akasha/talos/talos-factory"
import { getClusterForNode, getNode } from "@akasha/talos/talos-nodes"
import type { ClusterIntent, NodeIntent } from "@akasha/talos/talos-schema"

export const NODE = "--node"

export const DOWNLOAD = "--download"

const VALUED: readonly string[] = [NODE, DOWNLOAD]

const INPUT = 1

const OPERATIONAL = 3

export type Named = { readonly node: string; readonly download: string | null }

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
    refusals.push(`this names the node to register for, as a word or after \`${NODE}\``)
  }
  if (node === undefined || refusals.length > 0) return { refused: refusals }
  return { node, download: flags.get(DOWNLOAD) ?? null }
}

export async function fetched(
  url: string
): Promise<{ readonly bytes: Uint8Array } | { readonly refused: string }> {
  let answer: Response
  try {
    answer = await fetch(url)
  } catch (thrown) {
    return { refused: `${url} would not be fetched: ${whyOf(thrown)}` }
  }
  if (!answer.ok) return { refused: `the installer ISO fetch answered ${answer.status}` }
  return { bytes: new Uint8Array(await answer.arrayBuffer()) }
}

async function registering(read: Named, given: Given): Promise<Answer> {
  let node: NodeIntent
  let cluster: ClusterIntent
  try {
    node = getNode(read.node)
    cluster = getClusterForNode(read.node)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: INPUT }
  }
  const id = await registerSchematic(emitSchematicYaml(buildSchematic(node)))
  const isoUrl = installerIsoUrl(id, cluster.talosVersion)
  const report = [`schematic id: ${id}`, `installer iso: ${isoUrl}`]
  if (read.download === null) return { report, refusals: [], code: 0 }
  const got = await fetched(isoUrl)
  if ("refused" in got) return { report, refusals: [got.refused], code: OPERATIONAL }
  const at = resolve(given.root, read.download)
  await writeFile(at, got.bytes)
  report.push(`wrote ${at}`)
  return { report, refusals: [], code: 0 }
}

export async function talosImageBuild(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: INPUT }
  try {
    return await registering(read, given)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: OPERATIONAL }
  }
}
