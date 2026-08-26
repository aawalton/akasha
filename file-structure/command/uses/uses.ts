export const summary = "Map what points at each file under one section of a repository"

import { relative, resolve } from "node:path"
import { edgesFrom, edgesInto, nodesIn } from "../../../graph/ask.ts"
import { CODE_EDGE } from "../../../graph/edge-producer/beside.ts"
import { IMPORT_EDGE } from "../../../graph/edge-producer/typescript.ts"
import { KEEPS_NOTHING } from "../../../graph/node-shape.ts"
import { AKASHA, rootsHere } from "../../../graph/roots.ts"

const TEST_SUFFIX = ".test.ts"

const ENTRY = "entry"

export const help = {
  description:
    "Print every file under a section with what points at it and by which edge, then tally each folder's doors. A file is an entry where something outside its own folder points at it, private where every pointer is inside that folder, a test where the runner reaches it rather than an importer, beside where it is a page sitting next to its own code, and unused where none of that holds. Each mark is read against the file's own folder rather than against the section asked about, so a folder is answerable for the files it holds and never for what its subfolders expose.",
  positionals: [
    {
      name: "root",
      description: "The section to map. Defaults to the working directory.",
    },
  ],
}

function folderOf(key: string): string {
  const cut = key.lastIndexOf("/")
  return cut < 0 ? "." : key.slice(0, cut)
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
  const mine = nodesIn(ctx, [AKASHA])
    .filter((node) => node.key.startsWith(`${section}/`))
    .sort((one, two) => (one.key < two.key ? -1 : 1))
  if (mine.length === 0) throw new Error(`${section} holds no file the graph knows`)
  const pointing = new Map<string, string[]>()
  const refs = mine.map((node) => ({ repo: node.repo, key: node.key }))
  for (const edge of edgesInto(ctx, refs, [AKASHA], [IMPORT_EDGE, CODE_EDGE])) {
    const line = `${edge.kind}  ${edge.from.key}`
    const held = pointing.get(edge.to.key)
    if (held === undefined) pointing.set(edge.to.key, [line])
    else held.push(edge.from.key === "" ? line : line)
  }
  const doors = new Map<string, string[]>()
  for (const node of mine) {
    const home = folderOf(node.key)
    const within = `${home}/`
    const who = [...(pointing.get(node.key) ?? [])].sort()
    const outside = who.filter((one) => !one.slice(one.indexOf("  ") + 2).startsWith(within))
    const beside = edgesFrom(ctx, node, [CODE_EDGE]).length > 0
    const mark = node.key.endsWith(TEST_SUFFIX)
      ? "test"
      : outside.length > 0
        ? ENTRY
        : who.length > 0
          ? "private"
          : beside
            ? "beside"
            : "unused"
    if (mark === ENTRY) {
      const held = doors.get(home)
      if (held === undefined) doors.set(home, [node.key])
      else held.push(node.key)
    }
    if (!doors.has(home)) doors.set(home, [])
    console.log(`${node.key}  ${mark}  ${who.length}`)
    for (const one of who) console.log(`    ${one}`)
  }
  console.log("")
  console.log("doors")
  for (const home of [...doors.keys()].sort()) {
    const held = doors.get(home) ?? []
    const named = held.map((key) => key.slice(home.length + 1)).join(", ")
    console.log(`    ${home}  ${held.length}${named === "" ? "" : `  ${named}`}`)
  }
}
