import { readFileSync, statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import {
  listedAt,
  slugsOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { game } from "akasha/story/game/game.page-type.ts"
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
import { gameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.ts"

const RUN = "run"
const WORKINGS = "workings"
const JSON_HELD = "json"
const UTF8 = "utf8"
const LAST = -1
const PARTED = "/"

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

export function gameSlugIn(said: string): string {
  const named = addressIn(said)
  return named.kind === "qualified" ? named.slug : said
}

export function gameAt(root: string, said: string): string | null {
  const listed = listedAt(root, game.slug, gameSlugIn(said))[0]
  return listed === undefined ? null : listed.path
}

export function runsUnder(at: string): string {
  return `${at.slice(0, at.lastIndexOf(PARTED))}${PARTED}${gameMechanicRun.pluralSlug}`
}

export function runsIn(root: string, said: string): readonly string[] {
  const opening = `${gameSlugIn(said)}-${RUN}-`
  return slugsOfType(root, gameMechanicRun.slug)
    .filter((one) => one.startsWith(opening))
    .toSorted()
}

function workingsAt(root: string, slug: string): string | null {
  const listed = listedAt(root, gameMechanicRun.slug, slug)[0]
  if (listed === undefined) return null
  return besideAt(listed.path, WORKINGS, JSON_HELD)
}

export function lastRunAt(root: string, said: string): string | null {
  const last = runsIn(root, said).at(LAST)
  if (last === undefined) return null
  const beside = workingsAt(root, last)
  if (beside === null) return null
  const at = isAbsolute(beside) ? beside : join(root, beside)
  if (statSync(at, { throwIfNoEntry: false }) === undefined) return null
  const body = readFileSync(at, UTF8).trim()
  return body === "" ? null : body
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
