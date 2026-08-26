export const summary = "Map who imports each file under one section of a repository"

import { relative, resolve } from "node:path"
import { edgesInto, nodesIn } from "../../../graph/ask.ts"
import { IMPORT_EDGE } from "../../../graph/edge-producer/typescript.ts"
import { KEEPS_NOTHING } from "../../../graph/node-shape.ts"
import { AKASHA, rootsHere } from "../../../graph/roots.ts"

export const help = {
  description:
    "Print every file under a section with the files that import it, and mark each one dead where nothing imports it, private where every importer is inside the section, and an entry where any importer is outside it.",
  positionals: [
    {
      name: "root",
      description: "The section to map. Defaults to the working directory.",
    },
  ],
}

export default async function uses(argv: readonly string[]): Promise<void> {
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
  const files = nodesIn(ctx, [AKASHA])
    .filter((node) => node.key.startsWith(under))
    .map((node) => node.key)
    .sort()
  if (files.length === 0) throw new Error(`${section} holds no file the graph knows`)
  const importers = new Map<string, string[]>()
  const refs = files.map((key) => ({ repo: AKASHA, key }))
  for (const edge of edgesInto(ctx, refs, [AKASHA], IMPORT_EDGE)) {
    const held = importers.get(edge.to.key)
    if (held === undefined) importers.set(edge.to.key, [edge.from.key])
    else held.push(edge.from.key)
  }
  for (const key of files) {
    const who = [...(importers.get(key) ?? [])].sort()
    const outside = who.filter((one) => !one.startsWith(under))
    const mark = who.length === 0 ? "dead" : outside.length === 0 ? "private" : "entry"
    console.log(`${key}  ${mark}  ${who.length}`)
    for (const one of who) console.log(`    ${one}`)
  }
}
