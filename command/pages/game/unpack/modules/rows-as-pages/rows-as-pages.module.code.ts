import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { gameDesignEntry } from "akasha/story/game/design-entry/game-design-entry.page-type.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { gameLoreEntry } from "akasha/story/game/lore-entry/game-lore-entry.page-type.ts"
import { gameMechanicRun } from "akasha/story/game/mechanic-run/game-mechanic-run.page-type.ts"

const BREAK = "\n"
const TS = "ts"
const PARTED = "/"
const HASH = "#"
const HELD = "md"
const ABOVE = 2
const WITHIN = 3

const KIND = "kind"
const CONTENT = "content"
const NAME = "name"
const EXTERNAL_ID = "external-id"
const DESIGN_KIND = "design-kind"
const SUBJECT_KEY = "subject-key"
const SOURCE_REF = "source-ref"
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

const MECHANIC = "mechanic"
const TURN = "turn"
const SAID = "said"
const SEED = "seed"
const FOLLOWS = "follows"
const LABEL = "label"
const PREV_HASH = "prevHash"
const RULEBOOK = "rulebook"
const RESOLVE = "resolve"
const ROLLS = "rolls"
const RUN = "run"
const ROLL = "roll"
const JSON_HELD = "json"
const SHOWN = 80
const SAID_HOLDS = 2000
const PADDED = 3

const A_BREAK = /([a-z0-9])([A-Z])/g
const A_DASH = /-/g
const A_RUN = /\s+/
const A_NUMBER = /(\d+)\s*$/
const A_RUN_OF_SPACE = /\s+/g
const A_NOT_SLUG = /[^a-z0-9]+/g
const A_RUN_OF_DASH = /-{2,}/g
const AN_EDGE_DASH = /^-|-$/g

export type Made = Naming | { readonly refused: string }

export type Rowing = {
  readonly gameSlug: string
  readonly folder: string
  readonly row: Record<string, unknown>
  readonly at: number
}

type Rowed = (rowing: Rowing) => Made

export type Ledger = { readonly under: string; readonly rowed: Rowed }

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
  return said
    .replace(A_BREAK, "$1-$2")
    .toLowerCase()
    .replace(A_NOT_SLUG, "-")
    .replace(A_RUN_OF_DASH, "-")
    .replace(AN_EDGE_DASH, "")
}

export function shortOf(said: string, holds: number): string {
  const flat = said.replace(A_RUN_OF_SPACE, " ").trim()
  return flat.length <= holds ? flat : `${flat.slice(0, holds).trimEnd()}…`
}

export function countedAt(at: number): string {
  return String(at).padStart(PADDED, "0")
}

export function numberIn(held: unknown): number | null {
  if (typeof held === "number") return Number.isFinite(held) ? held : null
  const said = textIn(held)
  if (said === null) return null
  const found = A_NUMBER.exec(said)
  return found === null ? null : Number(found[1])
}

function saidOf(held: unknown): string {
  if (typeof held === "string") return held
  if (typeof held === "number" || typeof held === "boolean") return String(held)
  return JSON.stringify(held)
}

function fieldsOf(held: Record<string, unknown>, skip: string | null): string[] {
  const lines: string[] = []
  for (const [key, value] of Object.entries(held)) {
    if (key === skip) continue
    lines.push(`**${titleOf(key)}** — ${saidOf(value)}`, "")
  }
  return lines
}

function listedOf(held: readonly unknown[], depth: number): string[] {
  const lines: string[] = []
  for (const one of held) {
    if (!isRecord(one)) {
      lines.push(`- ${saidOf(one)}`, "")
      continue
    }
    const named = textIn(one[NAME])
    if (named === null) {
      lines.push(...fieldsOf(one, null))
      continue
    }
    lines.push(`${HASH.repeat(depth)} ${named}`, "")
    lines.push(...fieldsOf(one, NAME))
  }
  return lines
}

export function noteOf(content: unknown): string {
  if (!isRecord(content)) return ""
  const lines: string[] = []
  for (const [key, value] of Object.entries(content)) {
    if (key === KIND) continue
    lines.push(`${HASH.repeat(ABOVE)} ${titleOf(key)}`, "")
    if (Array.isArray(value)) lines.push(...listedOf(value, WITHIN))
    else if (isRecord(value)) lines.push(...fieldsOf(value, null))
    else lines.push(saidOf(value), "")
  }
  return `${lines.join(BREAK).trim()}${BREAK}`
}

function pathOf(folder: string, slug: string, pageTypeSlug: string): string {
  return `${folder}${PARTED}${slug}.${pageTypeSlug}.${TS}`
}

export function designRowed({ gameSlug, folder, row }: Rowing): Made {
  const external = textIn(row[EXTERNAL_ID])
  const kind = textIn(row[DESIGN_KIND])
  if (external === null || kind === null) {
    return { refused: "a design entry row names no external id or no kind" }
  }
  const source = textIn(row[SOURCE_REF])
  const supersedes = textIn(row[SUPERSEDES])
  const slug = `${gameSlug}-${sluggedOf(external)}`
  return {
    pageTypeSlug: gameDesignEntry.slug,
    slug,
    path: pathOf(folder, slug, gameDesignEntry.slug),
    values: {
      title: titleOf(textIn(row[SUBJECT_KEY]) ?? external),
      game: namedAs(game.slug, gameSlug, null),
      kind,
      ...(source === null ? {} : { source }),
      ...(supersedes === null
        ? {}
        : {
            supersedes: namedAs(gameDesignEntry.slug, `${gameSlug}-${sluggedOf(supersedes)}`, null),
          }),
      note: HELD,
    },
    bodies: { note: noteOf(row[CONTENT]) },
  }
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
      game: namedAs(game.slug, gameSlug, null),
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
  const turn = numberIn(row[TURN])
  const mechanic = textIn(row[MECHANIC])
  if (turn === null || mechanic === null) {
    return { refused: "a mechanic run row names no turn or no mechanic" }
  }
  const said = textIn(row[SAID])
  const seed = textIn(row[SEED])
  const follows = textIn(row[FOLLOWS])
  const slug = `${gameSlug}-${RUN}-${countedAt(at)}`
  return {
    pageTypeSlug: gameMechanicRun.slug,
    slug,
    path: pathOf(folder, slug, gameMechanicRun.slug),
    values: {
      title: shortOf(said ?? `${mechanic} at turn ${turn}`, SHOWN),
      game: namedAs(game.slug, gameSlug, null),
      turn,
      mechanic,
      ...(said === null ? {} : { said: shortOf(said, SAID_HOLDS) }),
      ...(seed === null ? {} : { seed }),
      ...(follows === null ? {} : { follows }),
      workings: JSON_HELD,
    },
    bodies: { workings: JSON.stringify(row) },
  }
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
  if (turn === null) return { refused: "a roll row names no turn" }
  const label = textIn(row[LABEL])
  const seed = textIn(row[SEED])
  const follows = textIn(row[PREV_HASH])
  const slug = `${gameSlug}-${ROLL}-${countedAt(at)}`
  return {
    pageTypeSlug: gameMechanicRun.slug,
    slug,
    path: pathOf(folder, slug, gameMechanicRun.slug),
    values: {
      title: shortOf(label ?? `${ROLL} at turn ${turn}`, SHOWN),
      game: namedAs(game.slug, gameSlug, null),
      turn,
      ...(label === null ? {} : { said: shortOf(label, SAID_HOLDS) }),
      ...(seed === null ? {} : { seed }),
      ...(follows === null ? {} : { follows }),
      workings: JSON_HELD,
    },
    bodies: { workings: JSON.stringify(ruleslessIn(row)) },
  }
}

export const LEDGERS: ReadonlyMap<string, Ledger> = new Map([
  [gameDesignEntry.pluralSlug, { under: gameDesignEntry.pluralSlug, rowed: designRowed } as Ledger],
  [gameLoreEntry.pluralSlug, { under: gameLoreEntry.pluralSlug, rowed: loreRowed } as Ledger],
  [gameMechanicRun.pluralSlug, { under: gameMechanicRun.pluralSlug, rowed: runRowed } as Ledger],
  [ROLLS, { under: gameMechanicRun.pluralSlug, rowed: rollRowed } as Ledger],
])
