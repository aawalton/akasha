import { readFileSync, statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  type Rolled,
  readingBy,
} from "akasha/story/game/mechanic/modules/dice-reading/dice-reading.module.code.ts"
import {
  type Dice,
  facesFrom,
} from "akasha/story/game/mechanic/modules/dice-rolling/dice-rolling.module.code.ts"
import {
  type Bonus,
  followingOn,
  type MechanicRun,
} from "akasha/story/game/mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import { ranAt } from "akasha/story/game/mechanic/modules/mechanic-running/mechanic-running.module.code.ts"

const RUNS = "mechanic-runs"
const JSONL = "jsonl"
const UTF8 = "utf8"
const BREAK = "\n"
const LAST = -1

export type Asking = {
  readonly root: string
  readonly game: string
  readonly turn: number
  readonly mechanic: string
  readonly reading: Record<string, unknown>
  readonly dice: string | null
  readonly bonuses: readonly Bonus[]
  readonly said: string | null
  readonly before: string | null
}

export type Settled = { readonly answered: MechanicRun } | { readonly refused: string }

type Thrown =
  | { readonly answered: { readonly dice: Dice; readonly roll: Rolled } }
  | { readonly refused: string }

export function runsAt(root: string, game: string): string | null {
  const named = addressIn(game)
  if (named.kind !== "qualified") return null
  const listed = listedAt(root, named.pageTypeSlug, named.slug)[0]
  if (listed === undefined) return null
  return besideAt(listed.path, RUNS, JSONL)
}

export function lastLineIn(body: string): string | null {
  const lines = body.split(BREAK).filter((one) => one.trim() !== "")
  return lines.at(LAST) ?? null
}

export function lastRunAt(root: string, game: string): string | null {
  const path = runsAt(root, game)
  if (path === null) return null
  const at = isAbsolute(path) ? path : join(root, path)
  if (statSync(at, { throwIfNoEntry: false }) === undefined) return null
  return lastLineIn(readFileSync(at, UTF8))
}

function thrownFrom(seed: string, said: string): Thrown {
  const shown = facesFrom(seed, said)
  if ("refused" in shown) return shown
  const dice = shown.answered
  const read = readingBy(dice.faces.length, dice.sides)({ faces: dice.faces })
  if ("refused" in read) return read
  return { answered: { dice, roll: read.answered } }
}

export async function settledBy(asking: Asking): Promise<Settled> {
  const follows = followingOn(asking.before)
  const seed = follows ?? asking.game
  let dice: Dice | null = null
  let reading: Record<string, unknown> = { ...asking.reading, bonuses: asking.bonuses }
  if (asking.dice !== null) {
    const thrown = thrownFrom(seed, asking.dice)
    if ("refused" in thrown) return thrown
    dice = thrown.answered.dice
    reading = { ...reading, roll: thrown.answered.roll }
  }
  const ran = await ranAt(asking.root, asking.mechanic, reading)
  if ("refused" in ran) return ran
  return {
    answered: {
      turn: asking.turn,
      mechanic: asking.mechanic,
      reading,
      answered: ran.answered,
      bonuses: asking.bonuses,
      dice,
      seed: dice === null ? null : seed,
      follows,
      said: asking.said,
    },
  }
}
