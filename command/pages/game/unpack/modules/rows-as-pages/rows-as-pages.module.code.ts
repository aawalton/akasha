import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { inLowerKebabCaseAcronymsWhole } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { gameLoreEntry } from "akasha/story/game/game-lore-entry/game-lore-entry.page-type.ts"
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

const CONTENT = "content"
const SUPERSEDES = "supersedes"

const EXTERNAL = "externalId"
const LORE_KIND = "loreKind"
const LORE_SUBJECT = "subjectKey"
const SOURCE_TURN = "sourceTurn"
const CITATION = "citation"
const QUOTE = "quote"
const VALUE = "value"
const SUMMARY = "summary"
const EVENT = "event"
const LINE = "line"
const ATTRIBUTE = "attribute"
const STATUS = "status"
const ORDINAL = "ordinal"
const SPEAKER = "speaker"

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

const A_BREAK = /([a-z0-9])([A-Z])/g
const A_DASH = /-/g
const A_RUN = /\s+/
const A_NUMBER = /(\d+)\s*$/
const A_NOT_SLUG = /[^a-z0-9]+/g
const A_RUN_OF_DASH = /-{2,}/g
const AN_EDGE_DASH = /^-|-$/g

export type Made = Naming | { readonly refused: string }

type Rowing = {
  readonly gameSlug: string
  readonly folder: string
  readonly row: Record<string, unknown>
  readonly at: number
}

type Rowed = (rowing: Rowing) => Made

type Ledger = { readonly under: string; readonly rowed: Rowed }

export function titleOf(said: string): string {
  return said
    .replace(A_BREAK, "$1 $2")
    .replace(A_DASH, " ")
    .split(A_RUN)
    .filter((one) => one !== "")
    .map((one) => `${one.slice(0, 1).toUpperCase()}${one.slice(1)}`)
    .join(" ")
}

export function sluggedOf(said: string): string {
  return inLowerKebabCaseAcronymsWhole(said)
    .replace(A_NOT_SLUG, "-")
    .replace(A_RUN_OF_DASH, "-")
    .replace(AN_EDGE_DASH, "")
}

export function numberIn(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  const said = textIn(held)
  if (said === null) return null
  const found = firstCapture(A_NUMBER.exec(said))
  return found === null ? null : Number(found)
}

export function loreRowed({ gameSlug, folder, row }: Rowing): Made {
  const external = textIn(row[EXTERNAL])
  const kind = textIn(row[LORE_KIND])
  const subject = textIn(row[LORE_SUBJECT])
  if (external === null || kind === null || subject === null) {
    return { refused: "a lore entry row names no external id, no kind or no subject" }
  }
  const turn = numberIn(row[SOURCE_TURN])
  if (turn === null) return { refused: `\`${external}\` cites no turn` }
  const content = row[CONTENT]
  if (!isRecord(content)) return { refused: `\`${external}\` says nothing` }
  const said =
    textIn(content[VALUE]) ??
    textIn(content[SUMMARY]) ??
    textIn(content[EVENT]) ??
    textIn(content[LINE])
  if (said === null) return { refused: `\`${external}\` says nothing` }
  const citation = row[CITATION]
  const cited = isRecord(citation) ? textIn(citation[QUOTE]) : null
  const attribute = textIn(content[ATTRIBUTE])
  const status = textIn(content[STATUS])
  const ordinal = numberIn(content[ORDINAL])
  const speaker = textIn(content[SPEAKER])
  const supersedes = textIn(row[SUPERSEDES])
  const slug = `${gameSlug}-${sluggedOf(external)}`
  return {
    pageTypeSlug: gameLoreEntry.slug,
    slug,
    path: pathOf(folder, slug, gameLoreEntry.slug),
    values: {
      title: titleOf(subject),
      game: namedAs(storyGame.slug, gameSlug, null),
      kind,
      subject,
      said,
      turn,
      ...(cited === null ? {} : { quote: cited }),
      ...(attribute === null ? {} : { attribute }),
      ...(status === null ? {} : { status }),
      ...(ordinal === null ? {} : { ordinal }),
      ...(speaker === null ? {} : { speaker }),
      ...(supersedes === null
        ? {}
        : {
            supersedes: namedAs(gameLoreEntry.slug, `${gameSlug}-${sluggedOf(supersedes)}`, null),
          }),
    },
  }
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
  [gameLoreEntry.pluralSlug, { under: gameLoreEntry.pluralSlug, rowed: loreRowed } as Ledger],
  [gameMechanicRun.pluralSlug, { under: gameMechanicRun.pluralSlug, rowed: runRowed } as Ledger],
  [ROLLS, { under: gameMechanicRun.pluralSlug, rowed: rollRowed } as Ledger],
])
