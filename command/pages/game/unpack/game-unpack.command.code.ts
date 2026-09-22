import { readFileSync, statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { game as gameArgument } from "akasha/command/argument/pages/game.argument.ts"
import { ledger as ledgerArgument } from "akasha/command/argument/pages/ledger.argument.ts"
import {
  answering,
  DATA,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { gameUnpack as page } from "akasha/command/pages/game/unpack/game-unpack.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  foldedFor,
  type Naming,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import { putting } from "akasha/page/service/modules/page-putting/page-putting.module.code.ts"
import { gameDesignEntry } from "akasha/story/game/design-entry/game-design-entry.page-type.ts"
import { game } from "akasha/story/game/game.page-type.ts"
import { designEntries } from "akasha/story/game/properties/design-entries.file-property.ts"

const NAMED = [gameArgument, ledgerArgument] as const

const JSONL = "jsonl"
const UTF8 = "utf8"
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

const A_BREAK = /([a-z0-9])([A-Z])/g
const A_DASH = /-/g
const A_RUN = /\s+/

export type Made = Naming | { readonly refused: string }

type Rowed = (gameSlug: string, folder: string, row: Record<string, unknown>) => Made

type Ledger = { readonly under: string; readonly rowed: Rowed }

export type Taken = { readonly game: string; readonly ledger: string }

export type Read = Taken | { readonly refused: string }

export type Found = { readonly at: string; readonly slug: string }

export function titleOf(said: string): string {
  return said
    .replace(A_BREAK, "$1 $2")
    .replace(A_DASH, " ")
    .split(A_RUN)
    .filter((one) => one !== "")
    .map((one) => `${one.slice(0, 1).toUpperCase()}${one.slice(1)}`)
    .join(" ")
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

export function designRowed(gameSlug: string, folder: string, row: Record<string, unknown>): Made {
  const external = textIn(row[EXTERNAL_ID])
  const kind = textIn(row[DESIGN_KIND])
  if (external === null || kind === null) {
    return { refused: "a design entry row names no external id or no kind" }
  }
  const source = textIn(row[SOURCE_REF])
  const supersedes = textIn(row[SUPERSEDES])
  const slug = `${gameSlug}-${external}`
  return {
    pageTypeSlug: gameDesignEntry.slug,
    slug,
    path: `${folder}${PARTED}${slug}.${gameDesignEntry.slug}.${TS}`,
    values: {
      title: titleOf(textIn(row[SUBJECT_KEY]) ?? external),
      game: namedAs(game.slug, gameSlug, null),
      kind,
      ...(source === null ? {} : { source }),
      ...(supersedes === null
        ? {}
        : { supersedes: namedAs(gameDesignEntry.slug, `${gameSlug}-${supersedes}`, null) }),
      note: HELD,
    },
    bodies: { note: noteOf(row[CONTENT]) },
  }
}

const LEDGERS: ReadonlyMap<string, Ledger> = new Map([
  [designEntries.propertySlug, { under: gameDesignEntry.pluralSlug, rowed: designRowed } as Ledger],
])

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const named = held.game.trim()
  if (named === "") return { refused: `\`${gameArgument.said}\` names no game` }
  const ledger = held.ledger.trim()
  if (!LEDGERS.has(ledger)) {
    return { refused: `\`${ledgerArgument.said}\` takes one of ${[...LEDGERS.keys()].join(", ")}` }
  }
  return { game: named, ledger }
}

export function foundIn(root: string, said: string): Found | null {
  const named = addressIn(said)
  const slug = named.kind === "qualified" ? named.slug : said
  const listed = listedAt(root, game.slug, slug)[0]
  if (listed === undefined) return null
  return { at: listed.path, slug }
}

export function rowsIn(body: string): readonly string[] {
  return body.split(BREAK).filter((one) => one.trim() !== "")
}

export function messageFor(ledger: string, gameSlug: string): string {
  return `make a page of each ${ledger} row of ${gameSlug}`
}

function folderFor(at: string, under: string): string {
  return `${at.slice(0, at.lastIndexOf(PARTED))}${PARTED}${under}`
}

async function unpacked(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const ledger = LEDGERS.get(held.ledger)
  if (ledger === undefined) return refused(`\`${held.ledger}\` names no ledger`, INPUT)
  const found = foundIn(given.root, held.game)
  if (found === null) return refused(`\`${held.game}\` names no game here`, DATA)
  const beside = besideAt(found.at, held.ledger, JSONL)
  if (beside === null) {
    return refused(`\`${found.at}\` is no page file, so no rows sit beside it`, DATA)
  }
  const at = isAbsolute(beside) ? beside : join(given.root, beside)
  if (statSync(at, { throwIfNoEntry: false }) === undefined) {
    return refused(`\`${beside}\` is nowhere, so this game keeps no such rows`, DATA)
  }
  const folder = folderFor(found.at, ledger.under)
  const naming: Naming[] = []
  for (const line of rowsIn(readFileSync(at, UTF8))) {
    const row: unknown = JSON.parse(line)
    if (!isRecord(row)) return refused(`a row of \`${beside}\` is no record`, DATA)
    const one = ledger.rowed(found.slug, folder, row)
    if ("refused" in one) return refused(one.refused, DATA)
    naming.push(one)
  }
  if (naming.length === 0) return refused(`\`${beside}\` holds no row`, DATA)
  const folded = foldedFor(given.root, naming)
  if ("refused" in folded) return refused(folded.refused, DATA)
  const landed = await landing(
    given.root,
    folded.puts.map(putting),
    messageFor(held.ledger, found.slug),
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(naming.map((one) => one.slug))
}

export async function gameUnpack(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async (done) => await unpacked(done, argv, given, landing))
}
