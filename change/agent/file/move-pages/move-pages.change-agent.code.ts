import { basename, dirname, join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { moveFileOfAnyKind } from "akasha/change/mechanical/file/move/move-file-of-any-kind/move-file-of-any-kind.change-mechanical.ts"
import {
  type Answer,
  gathered,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/change/modules/value-carrying/value-carrying.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const MOVE_FILE_OF_ANY_KIND = `${changeMechanical.slug}/${moveFileOfAnyKind.slug}` as const

const MOVED = "moved"

const AT_MOST = "at-most"

const NONE_LEFT =
  "every line names a page sitting where that line lands already, so none is carried"

const SPACED = /\s+/

const PARTED = "is no path and folder parted by a space"

const IN_A_FILE = "lands in a file rather than a folder, and a carry keeps a page's name"

const SITS_IN = "names the folder that page already sits in"

const NO_LINE = "no line was handed in, so no page is carried"

export type Pair = {
  readonly at: string
  readonly to: string
}

export type Read = { readonly pairs: readonly Pair[] } | { readonly refused: string }

export function readIn(said: string): Read {
  const pairs: Pair[] = []
  for (const line of said.split("\n")) {
    const one = line.trim()
    if (one === "") continue
    const words = one.split(SPACED)
    const at = words[0]
    const to = words[1]
    if (words.length !== 2 || at === undefined || to === undefined) {
      return { refused: `\`${one}\` ${PARTED}` }
    }
    if (partedIn(to) !== null) return { refused: `\`${one}\` ${IN_A_FILE}` }
    if (dirname(at) === to) return { refused: `\`${one}\` ${SITS_IN}` }
    pairs.push({ at, to })
  }
  return { pairs }
}

export async function movePages(
  world: World,
  pairs: readonly Pair[],
  atMost: number | null = null
): Promise<Answer> {
  const carried: Answer[] = []
  let seen = world
  for (const one of pairs) {
    if (atMost !== null && carried.length >= atMost) break
    const to = join(one.to, basename(one.at))
    if (seen.textOf(one.at) === null && seen.textOf(to) !== null) continue
    const carrying = await reach(seen, MOVE_FILE_OF_ANY_KIND, { from: one.at, to })
    const why = carrying.said.refused
    if (why !== null) {
      return refusing(`${why}. \`${one.at} ${one.to}\` is the pair, and no page here is carried`)
    }
    carried.push(carrying.said)
    seen = carrying.world
  }
  if (carried.length === 0) return refusing(NONE_LEFT)
  return gathered(carried)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [MOVED, AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const said = given[MOVED]
  if (said === undefined) return refusing(missing(MOVED))
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  const read = readIn(said)
  if ("refused" in read) return refusing(read.refused)
  if (read.pairs.length === 0) return refusing(NO_LINE)
  return await movePages(world, read.pairs, atMost)
}
