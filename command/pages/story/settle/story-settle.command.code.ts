import { createHash } from "node:crypto"
import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { appendLines } from "akasha/change/mechanical/file-content/append-lines/append-lines.change-mechanical-file-content.ts"
import { changeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { dice as diceArgument } from "akasha/command/argument/pages/dice.argument.ts"
import { reading as readingArgument } from "akasha/command/argument/pages/reading.argument.ts"
import { settledCheck as checkArgument } from "akasha/command/argument/pages/settled-check.argument.ts"
import { story as storyArgument } from "akasha/command/argument/pages/story.argument.ts"
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
import { storySettle as page } from "akasha/command/pages/story/settle/story-settle.command.ts"
import {
  listedAt,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { settling } from "akasha/story/world/mechanics/checks/properties/settling.module-property-group.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import type { Dice } from "akasha/story/world/mechanics/modules/dice-rolling/dice-rolling.module.code.ts"
import { thrownFrom } from "akasha/story/world/mechanics/modules/dice-throwing/dice-throwing.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { rolls } from "akasha/story/world/stories/played/turns/properties/rolls.file-property.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { z } from "zod"

const NAMED = [storyArgument, checkArgument, readingArgument, diceArgument] as const

const APPEND = `${changeMechanicalFileContent.slug}/${appendLines.slug}` as const
const SETTLED = "settled"
const CODE = "code"
const HELD_TS = "ts"
const JSONL = "jsonl"
const UTF8 = "utf8"
const DIGEST = "sha256"
const HEX = "hex"
const BREAK = "\n"
const TAB = "\t"
const COLLECTIONS = "partOfCollections"
const POSITION = "position"
const SLUG = "slug"

const READING_SAID = z.record(z.string(), z.unknown())

type Settle = (given: unknown, thrown: Rolled) => unknown

type Taken = {
  readonly story: string
  readonly check: string
  readonly reading: Record<string, unknown>
  readonly dice: string
}

type Read = Taken | { readonly refused: string }

export type Turn = { readonly at: string; readonly slug: string; readonly position: number }

export type Reach = {
  readonly turnsOf: (root: string, story: string) => readonly Turn[]
  readonly settlingAt: (root: string, check: string) => string | null
}

export type Roll = {
  readonly check: string
  readonly reading: Record<string, unknown>
  readonly dice: Dice
  readonly seed: string
  readonly answered: unknown
}

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

export function readingIn(said: string): Held<Record<string, unknown>> {
  let held: z.ZodSafeParseResult<Record<string, unknown>>
  try {
    held = READING_SAID.safeParse(JSON.parse(said))
  } catch {
    return { refused: `\`${readingArgument.said}\` takes JSON, and what was said is none` }
  }
  if (held.success) return { answered: held.data }
  return { refused: `\`${readingArgument.said}\` takes what the check reads, keyed by name` }
}

export function taken(argv: readonly string[], calledAs: string): Read {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  const held = read.taken
  const story = held.story.trim()
  if (story === "") return { refused: `\`${storyArgument.said}\` names no story` }
  const check = held.settledCheck.trim()
  if (check === "") return { refused: `\`${checkArgument.said}\` names no check` }
  const dice = held.dice.trim()
  if (dice === "") return { refused: `\`${diceArgument.said}\` names no dice` }
  const reading = readingIn(held.reading)
  if ("refused" in reading) return reading
  return { story, check, reading: reading.answered, dice }
}

function turnsIndexed(root: string, story: string): readonly Turn[] {
  const named = `${storyPlayed.slug}/${story}`
  const found: Turn[] = []
  for (const one of valuesOfType(root, storyTurnPlayed.slug)) {
    const within = one.value[COLLECTIONS]
    const position = one.value[POSITION]
    const slug = one.value[SLUG]
    if (!Array.isArray(within) || !within.includes(named)) continue
    if (typeof position !== "number" || typeof slug !== "string") continue
    found.push({ at: one.path, slug, position })
  }
  return found
}

function settlingIndexed(root: string, check: string): string | null {
  const listed = listedAt(root, worldCheck.slug, check)[0]
  if (listed === undefined) return null
  return besideAt(listed.path, `${settling.propertySlug}.${CODE}`, HELD_TS)
}

const INDEXED: Reach = { turnsOf: turnsIndexed, settlingAt: settlingIndexed }

export function rollsAt(turn: string): string | null {
  return besideAt(turn, rolls.propertySlug, JSONL)
}

function lastLineAt(root: string, turn: string): string | null {
  const at = rollsAt(turn)
  if (at === null) return null
  const path = join(root, at)
  if (statSync(path, { throwIfNoEntry: false }) === undefined) return null
  const lines = readFileSync(path, UTF8)
    .split(BREAK)
    .filter((one) => one.trim() !== "")
  return lines.at(-1) ?? null
}

export function rollBefore(root: string, turns: readonly Turn[]): string | null {
  for (const one of turns.toSorted((a, b) => b.position - a.position)) {
    const line = lastLineAt(root, one.at)
    if (line !== null) return line
  }
  return null
}

export function seedAfter(before: string | null, turn: string): string {
  return before === null ? turn : createHash(DIGEST).update(before).digest(HEX)
}

async function settledAt(path: string, reading: unknown, roll: Rolled): Promise<Held<unknown>> {
  const held = (await import(path)) as Record<string, unknown>
  const settle = held[SETTLED]
  if (typeof settle !== "function") {
    return { refused: `\`${path}\` exports no \`${SETTLED}\`, so nothing settles the roll` }
  }
  const said = (settle as Settle)(reading, roll)
  if (!isRecord(said)) return { refused: `\`${path}\` answered no roll` }
  const why = said["refused"]
  if (typeof why === "string") return { refused: why }
  return { answered: said["answered"] }
}

export function rowsOf(roll: Roll, turn: string, commit: string | null): readonly string[] {
  const rows = [
    `check${TAB}${roll.check}`,
    `turn${TAB}${turn}`,
    `dice${TAB}${roll.dice.said}${TAB}${roll.dice.faces.join(" ")}`,
    `seed${TAB}${roll.seed}`,
  ]
  if (isRecord(roll.answered)) {
    for (const [key, value] of Object.entries(roll.answered)) {
      rows.push(`${key}${TAB}${JSON.stringify(value)}`)
    }
  } else {
    rows.push(`answered${TAB}${JSON.stringify(roll.answered)}`)
  }
  if (commit !== null) rows.push(`commit${TAB}${commit}`)
  return rows
}

async function settledOn(
  done: string[],
  argv: readonly string[],
  given: Given,
  landing: Landing,
  reach: Reach
): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, INPUT)
  const turns = reach.turnsOf(given.root, held.story)
  const latest = turns.toSorted((a, b) => a.position - b.position).at(-1)
  if (latest === undefined) return refused(`\`${held.story}\` has no open turn here`, DATA)
  const code = reach.settlingAt(given.root, held.check)
  if (code === null) return refused(`\`${held.check}\` names no check here`, DATA)
  const at = rollsAt(latest.at)
  if (at === null)
    return refused(`\`${latest.at}\` is no page file, so no rolls sit beside it`, DATA)
  const seed = seedAfter(rollBefore(given.root, turns), latest.slug)
  const thrown = thrownFrom(seed, held.dice)
  if ("refused" in thrown) return refused(thrown.refused, INPUT)
  const said = await settledAt(join(given.root, code), held.reading, thrown.answered.roll)
  if ("refused" in said) return refused(said.refused, DATA)
  const roll: Roll = {
    check: `${worldCheck.slug}/${held.check}`,
    reading: held.reading,
    dice: thrown.answered.dice,
    seed,
    answered: said.answered,
  }
  const landed = await landing(
    given.root,
    [{ at: APPEND, given: { at, content: `${JSON.stringify(roll)}${BREAK}` } }],
    `settle ${held.check} on ${latest.slug}`,
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(rowsOf(roll, latest.slug, landed.commit))
}

export async function storySettle(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Reach = INDEXED
): Promise<Answer> {
  return await answering(async (done) => await settledOn(done, argv, given, landing, reach))
}
