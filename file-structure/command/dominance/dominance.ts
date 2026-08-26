export const summary = "Group each file of one section under the folder that holds everything pointing at it"

import { relative, resolve } from "node:path"
import { edgesInto, nodesIn } from "../../../graph/ask.ts"
import { CODE_EDGE } from "../../../graph/edge-producer/beside.ts"
import { IMPORT_EDGE } from "../../../graph/edge-producer/typescript.ts"
import { KEEPS_NOTHING } from "../../../graph/node-shape.ts"
import { AKASHA, rootsHere } from "../../../graph/roots.ts"

const ROOT_FOLDER = "."

const NOTHING = "-"

export const help = {
  description:
    "Print the dominance tree of a section: each file under the deepest folder holding every file that points at it. A file grouped above its own folder is one something outside that folder reaches into. A file nothing points at is grouped under a dash, having no dominator at all.",
  positionals: [
    {
      name: "root",
      description: "The section to group. Defaults to the working directory.",
    },
  ],
}

function folderOf(key: string): string {
  const cut = key.lastIndexOf("/")
  return cut < 0 ? ROOT_FOLDER : key.slice(0, cut)
}

function deepestHolding(keys: readonly string[]): string {
  const split = keys.map((key) => folderOf(key).split("/"))
  const first = split[0]
  if (first === undefined) return NOTHING
  const shared: string[] = []
  for (let at = 0; at < first.length; at += 1) {
    const part = first[at]
    if (!split.every((one) => one[at] === part)) break
    shared.push(part as string)
  }
  const joined = shared.join("/")
  return joined === "" ? ROOT_FOLDER : joined
}

export default async function dominance(argv: readonly string[]): Promise<void> {
  const roots = rootsHere()
  const repoRoot = roots[AKASHA]
  if (repoRoot === undefined) throw new Error("akasha is not cloned here, so there is no graph to ask")
  const at = resolve(argv[0] ?? ".")
  const section = relative(repoRoot, at)
  if (section === "" || section.startsWith("..")) {
    throw new Error(`${at} is outside akasha, and the graph this asks is the akasha one`)
  }
  const ctx = { roots, said: KEEPS_NOTHING }
  const under = `${section}/`
  const mine = nodesIn(ctx, [AKASHA]).filter((node) => node.key.startsWith(under))
  if (mine.length === 0) throw new Error(`${section} holds no file the graph knows`)
  const pointing = new Map<string, string[]>()
  const refs = mine.map((node) => ({ repo: node.repo, key: node.key }))
  for (const edge of edgesInto(ctx, refs, [AKASHA], [IMPORT_EDGE, CODE_EDGE])) {
    const held = pointing.get(edge.to.key)
    if (held === undefined) pointing.set(edge.to.key, [edge.from.key])
    else held.push(edge.from.key)
  }
  const grouped = new Map<string, string[]>()
  for (const node of mine) {
    const who = pointing.get(node.key) ?? []
    const home = who.length === 0 ? NOTHING : deepestHolding(who)
    const held = grouped.get(home)
    if (held === undefined) grouped.set(home, [node.key])
    else held.push(node.key)
  }
  const homes = [...grouped.keys()].sort((one, two) => {
    if (one === NOTHING) return 1
    if (two === NOTHING) return -1
    return one < two ? -1 : 1
  })
  for (const home of homes) {
    console.log(home)
    for (const key of (grouped.get(home) ?? []).sort()) {
      const mark = home === NOTHING || folderOf(key) === home ? "" : "  reached into"
      console.log(`    ${key}${mark}`)
    }
  }
}
