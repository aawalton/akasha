export const summary = "Map what points at each file under one section of a repository"

import { relative, resolve } from "node:path"
import { edgesFrom, edgesInto, nodesIn } from "../../../graph/ask.ts"
import { CODE_EDGE } from "../../../graph/edge-producer/beside.ts"
import { KEEPS_NOTHING } from "../../../graph/node-shape.ts"
import { AKASHA, rootsHere } from "../../../graph/roots.ts"

const TEST_SUFFIX = ".test.ts"

export const help = {
  description:
    "Print every file under a section with what points at it and by which edge. A file is an entry where something outside the section points at it, private where every pointer is inside, a test where the runner reaches it rather than an importer, beside where it is a page sitting next to its own code, and unused where none of that holds.",
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
  const mine = nodesIn(ctx, [AKASHA])
    .filter((node) => node.key.startsWith(under))
    .sort((one, two) => (one.key < two.key ? -1 : 1))
  if (mine.length === 0) throw new Error(`${section} holds no file the graph knows`)
  const pointing = new Map<string, string[]>()
  const refs = mine.map((node) => ({ repo: node.repo, key: node.key }))
  for (const edge of edgesInto(ctx, refs, [AKASHA], null)) {
    const line = `${edge.kind}  ${edge.from.key}`
    const held = pointing.get(edge.to.key)
    if (held === undefined) pointing.set(edge.to.key, [line])
    else held.push(line)
  }
  for (const node of mine) {
    const who = [...(pointing.get(node.key) ?? [])].sort()
    const outside = who.filter((one) => !one.slice(one.indexOf("  ") + 2).startsWith(under))
    const beside = edgesFrom(ctx, node, CODE_EDGE).length > 0
    const mark = node.key.endsWith(TEST_SUFFIX)
      ? "test"
      : outside.length > 0
        ? "entry"
        : who.length > 0
          ? "private"
          : beside
            ? "beside"
            : "unused"
    console.log(`${node.key}  ${mark}  ${who.length}`)
    for (const one of who) console.log(`    ${one}`)
  }
}
