import { basename, dirname, join } from "node:path"
import { partedIn } from "@akasha/pages/page-file-name"
import { gathered, missing, refusing } from "../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/shadow/change-shadow.module.code.ts"

const MOVE_FILE_OF_ANY_KIND = "change-mechanical/move-file-of-any-kind"

const MOVED = "moved"

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

export async function movePages(world: World, pairs: readonly Pair[]): Promise<Answer> {
  const carried: Answer[] = []
  let seen = world
  for (const one of pairs) {
    const to = join(one.to, basename(one.at))
    const carrying = await reach(seen, MOVE_FILE_OF_ANY_KIND, { from: one.at, to })
    const why = carrying.said.refused
    if (why !== null) {
      return refusing(`${why}. \`${one.at} ${one.to}\` is the pair, and no page here is carried`)
    }
    carried.push(carrying.said)
    seen = carrying.world
  }
  return gathered(carried)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const said = given[MOVED]
  if (said === undefined) return refusing(missing(MOVED))
  const read = readIn(said)
  if ("refused" in read) return refusing(read.refused)
  if (read.pairs.length === 0) return refusing(NO_LINE)
  return await movePages(world, read.pairs)
}
