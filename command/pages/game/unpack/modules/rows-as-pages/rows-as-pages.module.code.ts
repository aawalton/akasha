import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { runIn } from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import { gameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.ts"
import {
  countedAt,
  pagedRun,
  pathOf,
  runSlugIn,
  shortOf,
} from "akasha/story/game/game-mechanic-run/modules/run-paging/run-paging.module.code.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"

const TURN = "turn"
const SEED = "seed"
const LABEL = "label"
const PREV_HASH = "prevHash"
const RULEBOOK = "rulebook"
const RESOLVE = "resolve"
const ROLLS = "rolls"
const ROLL = "roll"
const JSON_HELD = "json"
const SHOWN = 80
const SAID_HOLDS = 2000

const A_NUMBER = /(\d+)\s*$/

type Made = Naming | { readonly refused: string }

type Rowing = {
  readonly gameSlug: string
  readonly folder: string
  readonly row: Record<string, unknown>
  readonly at: number
}

type Rowed = (rowing: Rowing) => Made

type Ledger = { readonly under: string; readonly rowed: Rowed }

export function numberIn(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  const said = textIn(held)
  if (said === null) return null
  const found = firstCapture(A_NUMBER.exec(said))
  return found === null ? null : Number(found)
}

export function runRowed({ gameSlug, folder, row, at }: Rowing): Made {
  const run = runIn(JSON.stringify(row))
  if (run === null) return { refused: "a mechanic run row names no turn or no mechanic" }
  return pagedRun({ gameSlug, folder, run, at })
}

export function ruleslessIn(row: Record<string, unknown>): Record<string, unknown> {
  const held: Record<string, unknown> = { ...row }
  const resolve = held[RESOLVE]
  if (!isRecord(resolve)) return held
  const kept: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(resolve)) {
    if (key !== RULEBOOK) kept[key] = value
  }
  held[RESOLVE] = kept
  return held
}

export function rollRowed({ gameSlug, folder, row, at }: Rowing): Made {
  const turn = numberIn(row[TURN])
  const label = textIn(row[LABEL])
  const seed = textIn(row[SEED])
  const follows = textIn(row[PREV_HASH])
  const slug = runSlugIn(gameSlug, ROLL, at)
  return {
    pageTypeSlug: gameMechanicRun.slug,
    slug,
    path: pathOf(folder, slug, gameMechanicRun.slug),
    values: {
      title: shortOf(label ?? `${ROLL} ${countedAt(at)}`, SHOWN),
      game: namedAs(storyGame.slug, gameSlug, null),
      ...(turn === null ? {} : { turn }),
      ...(label === null ? {} : { said: shortOf(label, SAID_HOLDS) }),
      ...(seed === null ? {} : { seed }),
      ...(follows === null ? {} : { follows }),
      workings: JSON_HELD,
    },
    bodies: { workings: JSON.stringify(ruleslessIn(row)) },
  }
}

export const LEDGERS: ReadonlyMap<string, Ledger> = new Map([
  [gameMechanicRun.pluralSlug, { under: gameMechanicRun.pluralSlug, rowed: runRowed } as Ledger],
  [ROLLS, { under: gameMechanicRun.pluralSlug, rowed: rollRowed } as Ledger],
])
