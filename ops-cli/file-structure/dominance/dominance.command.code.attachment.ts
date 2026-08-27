export const summary = "Group each file of one section under the folder that holds everything pointing at it"

import { AKASHA } from "../../../repo/roots/roots.ts"
import { ROOT_FOLDER, folderOf, pointersInto, sectionAt } from "../../../file-structure/section.ts"

const NOTHING = "-"

const FOREIGN = "outside akasha"

export const help = {
  description:
    "Print the dominance tree of a section: each file under the deepest folder holding every file that points at it. A file grouped above its own folder is one something outside that folder reaches into. A file anything in another repository points at is grouped as outside akasha, no folder here holding its callers. A file nothing points at is grouped under a dash, having no dominator at all.",
  positionals: [
    {
      name: "root",
      description: "The section to group. Defaults to the working directory.",
    },
  ],
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
  const section = sectionAt(argv)
  const here = new Map<string, string[]>()
  const abroad = new Set<string>()
  for (const edge of pointersInto(section)) {
    if (edge.from.repo !== AKASHA) {
      abroad.add(edge.to.key)
      continue
    }
    const held = here.get(edge.to.key)
    if (held === undefined) here.set(edge.to.key, [edge.from.key])
    else held.push(edge.from.key)
  }
  const grouped = new Map<string, string[]>()
  for (const node of section.nodes) {
    const who = here.get(node.key) ?? []
    const home = abroad.has(node.key) ? FOREIGN : who.length === 0 ? NOTHING : deepestHolding(who)
    const held = grouped.get(home)
    if (held === undefined) grouped.set(home, [node.key])
    else held.push(node.key)
  }
  const homes = [...grouped.keys()].sort((one, two) => {
    if (one === NOTHING) return 1
    if (two === NOTHING) return -1
    if (one === FOREIGN) return 1
    if (two === FOREIGN) return -1
    return one < two ? -1 : 1
  })
  for (const home of homes) {
    console.log(home)
    for (const key of (grouped.get(home) ?? []).sort()) {
      const mark = home === NOTHING || home === FOREIGN || folderOf(key) === home ? "" : "  reached into"
      console.log(`    ${key}${mark}`)
    }
  }
}
