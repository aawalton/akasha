import { reachesIn } from "@akasha/code-system/package-manifest"
import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import { FILES, input, textIn } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { manifestsIn } from "../package-reached-where-named/package-reached-where-named.code-check.code.ts"

const SAID = "a way into a package lands on a file the change leaves there"

export function missingIn(
  folder: string,
  text: string,
  there: (path: string) => boolean
): readonly string[] {
  const said: string[] = []
  for (const [specifier, path] of reachesIn(folder, text)) {
    if (there(path)) continue
    said.push(`names \`${specifier}\`, which lands on ${path}, where no file is — ${SAID}`)
  }
  return said
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const said: Judged[] = []
  const there = (path: string): boolean => change.after(path) !== null
  for (const one of manifestsIn(shadow)) {
    const text = textIn(change, one.at)
    if (text === null) continue
    for (const reason of missingIn(one.folder, text, there)) said.push({ path: one.at, reason })
  }
  return said.sort((one, two) => (one.path < two.path ? -1 : one.path > two.path ? 1 : 0))
}

export const manifestLandsOnAFile = input(FILES, refusalsIn)
