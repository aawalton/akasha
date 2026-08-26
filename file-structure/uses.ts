export const summary = "Map what points at each file under one section of a repository"

import { edgesFrom } from "../graph/ask.ts"
import { CODE_EDGE } from "../graph/edge-producer/beside/beside.ts"
import { AKASHA } from "../repo/roots/roots.ts"
import { folderOf, pointersInto, sectionAt } from "./section.ts"

const TEST_SUFFIX = ".test.ts"

const ENTRY = "entry"

export const help = {
  description:
    "Print every file under a section with what points at it and by which edge, then tally each folder's doors. Every folder under the section is tallied, including one holding no file of its own, which stands at zero rather than going unnamed. A file is an entry where something outside its own folder points at it, private where every pointer is inside that folder, a test where the runner reaches it rather than an importer, beside where it is a page sitting next to its own code, and unused where none of that holds. Pointers are gathered from every repository cloned here, not from akasha alone, and one from another repository is spelled with its repository first. Each mark is read against the file's own folder rather than against the section asked about, so a folder is answerable for the files it holds and never for what its subfolders expose.",
  positionals: [
    {
      name: "root",
      description: "The section to map. Defaults to the working directory.",
    },
  ],
}

function chainTo(from: string, to: string): readonly string[] {
  const out = [from]
  if (to === from) return out
  let at = from
  for (const part of to.slice(from.length + 1).split("/")) {
    at = `${at}/${part}`
    out.push(at)
  }
  return out
}

export default async function uses(argv: readonly string[]): Promise<void> {
  const section = sectionAt(argv)
  const pointing = new Map<string, { kind: string; from: string; foreign: boolean }[]>()
  for (const edge of pointersInto(section)) {
    const foreign = edge.from.repo !== AKASHA
    const one = { kind: edge.kind, from: foreign ? `${edge.from.repo}:${edge.from.key}` : edge.from.key, foreign }
    const held = pointing.get(edge.to.key)
    if (held === undefined) pointing.set(edge.to.key, [one])
    else held.push(one)
  }
  const doors = new Map<string, string[]>()
  for (const node of section.nodes) {
    const home = folderOf(node.key)
    const within = `${home}/`
    const who = [...(pointing.get(node.key) ?? [])].sort((one, two) => (one.from < two.from ? -1 : 1))
    const outside = who.filter((one) => one.foreign || !one.from.startsWith(within))
    const beside = edgesFrom(section.ctx, node, [CODE_EDGE]).length > 0
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
    for (const folder of chainTo(section.path, home)) if (!doors.has(folder)) doors.set(folder, [])
    console.log(`${node.key}  ${mark}  ${who.length}`)
    for (const one of who) console.log(`    ${one.kind}  ${one.from}`)
  }
  console.log("")
  console.log("doors")
  for (const home of [...doors.keys()].sort()) {
    const held = doors.get(home) ?? []
    const named = held.map((key) => key.slice(home.length + 1)).join(", ")
    console.log(`    ${home}  ${held.length}${named === "" ? "" : `  ${named}`}`)
  }
}
