import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import { editsAt } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  foldedOver,
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { dice as diceArgument } from "akasha/command/argument/pages/dice.argument.ts"
import { draft as draftArgument } from "akasha/command/argument/pages/draft.argument.ts"
import { playedTurn as turnArgument } from "akasha/command/argument/pages/played-turn.argument.ts"
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
import { noPageSaid } from "akasha/command/modules/change-acting/change-acting.module.code.ts"
import {
  appending,
  stamped,
} from "akasha/command/modules/change-running/change-running.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  askedFor,
  keptOnly,
  keptPageOf,
  pageIn,
  type Summed,
  settledAt,
  settledBefore,
  summedFor,
  sumsOf,
  takenBackOf,
} from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"
import {
  lineBefore,
  linesIn,
  type Reading,
  seedAfter,
  unmadeLogged,
} from "akasha/command/pages/story/settle/modules/settle-seeding/settle-seeding.module.code.ts"
import { storySettle as page } from "akasha/command/pages/story/settle/story-settle.command.ts"
import { agentPathOf } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import {
  listedAt,
  valueByPath,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { pathOf } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import { settling } from "akasha/story/world/mechanics/checks/properties/settling.module-property-group.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"
import type { Rolled } from "akasha/story/world/mechanics/modules/dice-reading/dice-reading.module.code.ts"
import type { Dice } from "akasha/story/world/mechanics/modules/dice-rolling/dice-rolling.module.code.ts"
import { thrownFrom } from "akasha/story/world/mechanics/modules/dice-throwing/dice-throwing.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  GAME_MASTER,
  stepIn,
  type TurnStep,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { outcomes } from "akasha/story/world/stories/played/turns/properties/outcomes.file-property.ts"
import { storyTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.ts"
import { z } from "zod"

const NAMED = [
  storyArgument,
  checkArgument,
  readingArgument,
  diceArgument,
  turnArgument,
  draftArgument,
] as const

const CODE = "code"
const HELD_TS = "ts"
const JSONL = "jsonl"
const UTF8 = "utf8"
const TAB = "\t"
const COLLECTIONS = "partOfCollections"
const POSITION = "position"
const SLUG = "slug"
const PARTED = "/"
const CHARACTER = "character"
const STEP_STATUS = "stepStatus"

const READING_SAID = z.record(z.string(), z.unknown())

type Taken = {
  readonly story: string
  readonly check: string
  readonly reading: Record<string, unknown>
  readonly dice: string | null
  readonly turn: string | null
  readonly drafts: boolean
}

type Read = Taken | { readonly refused: string }

export type Turn = { readonly at: string; readonly slug: string; readonly position: number }

export type Reach = {
  readonly turnsOf: (root: string, story: string) => readonly Turn[]
  readonly settlingAt: (root: string, check: string) => string | null
  readonly pageAt: (root: string, page: string) => string | null
  readonly keptPageAt: (root: string, agentId: string | null, page: string) => string | null
  readonly unmadeOf: (root: string, turn: string) => number
  readonly stepOf: (root: string, turn: string) => TurnStep | null
}

export type Roll = {
  readonly check: string
  readonly reading: Record<string, unknown>
  readonly dice?: Dice
  readonly seed?: string
  readonly answered: unknown
}

type Cast = { readonly dice: Dice; readonly roll: Rolled; readonly seed: string }

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

function readingIn(said: string): Held<Record<string, unknown>> {
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
  const dice = held.dice?.trim() ?? null
  if (dice === "") return { refused: `\`${diceArgument.said}\` names no dice` }
  const turn = held.playedTurn?.trim() ?? null
  if (turn === "") return { refused: `\`${turnArgument.said}\` names no turn` }
  const reading = readingIn(held.reading)
  if ("refused" in reading) return reading
  return {
    story,
    check,
    reading: reading.answered,
    dice,
    turn: turn === null ? null : turn.slice(turn.lastIndexOf(PARTED) + 1),
    drafts: held.draft,
  }
}

export function turnsIndexed(root: string, story: string): readonly Turn[] {
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

export function settlingIndexed(root: string, check: string): string | null {
  const listed = listedAt(root, worldCheck.slug, check)[0]
  if (listed === undefined) return null
  return besideAt(listed.path, `${settling.propertySlug}.${CODE}`, HELD_TS)
}

const INDEXED: Reach = {
  turnsOf: turnsIndexed,
  settlingAt: settlingIndexed,
  pageAt: pathOf,
  keptPageAt: keptPageOf,
  unmadeOf: (root, turn) => unmadeLogged(root, [turn, outcomesAt(turn) ?? turn]),
  stepOf: (root, turn) => stepIn(valueByPath(root, turn)?.[STEP_STATUS]),
}

export function outcomesAt(turn: string): string | null {
  return besideAt(turn, outcomes.propertySlug, JSONL)
}

function castFor(read: Reading, placed: Placed, dice: string | null): Held<Cast | null> {
  if (dice === null) return { answered: null }
  const { turns, on, at, unmade } = placed
  const before = turns
    .filter((one) => one.position <= on.position)
    .map((one) => ({ position: one.position, outcomes: outcomesAt(one.at) }))
  const seed = seedAfter(lineBefore(read, before), on.slug, linesIn(read, at).length, unmade)
  const thrown = thrownFrom(seed, dice)
  if ("refused" in thrown) return thrown
  return { answered: { ...thrown.answered, seed } }
}

function rowsOf(made: Made, turn: string, commit: string | null): readonly string[] {
  const { roll, sums, replaced } = made
  const rows = [`check${TAB}${roll.check}`, `turn${TAB}${turn}`]
  if (replaced !== null) rows.push(`replaced${TAB}line ${replaced + 1}`)
  if (roll.dice !== undefined) {
    rows.push(`dice${TAB}${roll.dice.said}${TAB}${roll.dice.faces.join(" ")}`)
  }
  if (roll.seed !== undefined) rows.push(`seed${TAB}${roll.seed}`)
  if (isRecord(roll.answered)) {
    for (const [key, value] of Object.entries(roll.answered)) {
      rows.push(`${key}${TAB}${JSON.stringify(value)}`)
    }
  } else {
    rows.push(`answered${TAB}${JSON.stringify(roll.answered)}`)
  }
  for (const one of sums) rows.push(["added", one.at, one.key, one.by].join(TAB))
  if (commit !== null) rows.push(`commit${TAB}${commit}`)
  return rows
}

type Code = typeof DATA | typeof INPUT

type Refusing = { readonly refused: string; readonly by: Code; readonly unfound?: string }

type Placed = {
  readonly turns: readonly Turn[]
  readonly on: Turn
  readonly at: string
  readonly code: string
  readonly unmade: number
  readonly step: TurnStep | null
}

type Made = {
  readonly roll: Roll
  readonly sums: readonly Summed[]
  readonly replaced: number | null
}

function placedFor(root: string, held: Taken, reach: Reach): Placed | Refusing {
  const turns = reach.turnsOf(root, held.story)
  const on =
    held.turn === null
      ? turns.toSorted((a, b) => a.position - b.position).at(-1)
      : turns.find((one) => one.slug === held.turn)
  if (on === undefined) {
    const why =
      held.turn === null
        ? `\`${held.story}\` has no open turn here`
        : `\`${held.turn}\` names no turn of \`${held.story}\` here`
    return { refused: why, by: DATA }
  }
  const code = reach.settlingAt(root, held.check)
  if (code === null) return { refused: `\`${held.check}\` names no check here`, by: DATA }
  const at = outcomesAt(on.at)
  if (at === null) {
    return { refused: `\`${on.at}\` is no page file, so no outcomes sit beside it`, by: DATA }
  }
  const unmade = held.dice === null ? 0 : reach.unmadeOf(root, on.at)
  return { turns, on, at, code, unmade, step: reach.stepOf(root, on.at) }
}

async function rollMade(
  root: string,
  held: Taken,
  placed: Placed,
  keptAt: (path: string) => string | null,
  pageAt: (named: string) => string | null
): Promise<Made | Refusing> {
  const cast = castFor(keptAt, placed, held.dice)
  if ("refused" in cast) return { refused: cast.refused, by: INPUT }
  const thrown = cast.answered
  const said = await settledAt(join(root, placed.code), held.reading, thrown?.roll ?? null)
  if ("refused" in said) return { refused: said.refused, by: DATA }
  const roll: Roll = {
    check: `${worldCheck.slug}/${held.check}`,
    reading: held.reading,
    ...(thrown === null ? {} : { dice: thrown.dice, seed: thrown.seed }),
    answered: said.answered.answered,
  }
  const before = settledBefore(keptAt(placed.at), roll)
  if (before !== null && placed.step !== GAME_MASTER) {
    const why = `\`${held.check}\` is settled on \`${placed.on.slug}\` already for this reading's \`${CHARACTER}\`, and a check that rolls nothing settles there again only at ${GAME_MASTER}, replacing that line`
    return { refused: why, by: DATA }
  }
  const back = before === null ? [] : await takenBackOf(join(root, placed.code), before.was)
  const sums = sumsOf([...said.answered.added, ...back], pageAt)
  if ("refused" in sums) return { ...sums, by: DATA }
  return { roll, sums, replaced: before?.place ?? null }
}

function onDisk(root: string): (path: string) => string | null {
  return (path) => {
    const at = join(root, path)
    return statSync(at, { throwIfNoEntry: false }) === undefined ? null : readFileSync(at, UTF8)
  }
}

async function drafted(held: Taken, placed: Placed, given: Given): Promise<Answer> {
  const keeper = given.agentId === null ? null : agentPathOf(given.root, given.agentId)
  if (keeper === null || editsAt(keeper) === null) {
    return mistaking([noPageSaid(given.root, given.agentId)])
  }
  const why: { said: Refusing | null } = { said: null }
  const made: { made: Made | null } = { made: null }
  const kept = await appending(given.root, keeper, given.agentId, false, async (world) => {
    const textOf = (path: string) => world.textOf(path)
    const pageAt = (named: string) => pageIn(world.index, named)
    const rolled = await rollMade(given.root, held, placed, textOf, pageAt)
    if ("refused" in rolled) {
      why.said = rolled
      return { edits: [], refused: rolled.refused }
    }
    made.made = rolled
    const turn = world.textOf(placed.on.at)
    const asked = askedFor(placed.at, placed.on.at, rolled.roll, turn)
    const asking = [...asked, ...summedFor(rolled.sums, textOf)]
    return stamped(await foldedOver(world, asking), false, false)
  })
  if (why.said !== null) return refused(why.said.refused, why.said.by)
  if (kept.code !== 0 || made.made === null) return kept
  return told([
    ...rowsOf(made.made, placed.on.slug, null),
    `the edits are kept beside ${keeper}, and \`akasha change apply\` lands them`,
  ])
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
  const placed = placedFor(given.root, held, reach)
  if ("refused" in placed) return refused(placed.refused, placed.by)
  if (held.drafts) return await drafted(held, placed, given)
  const read = onDisk(given.root)
  const made = await rollMade(given.root, held, placed, read, (one) =>
    reach.pageAt(given.root, one)
  )
  if ("refused" in made) {
    const kept = made.unfound
    if (kept === undefined || reach.keptPageAt(given.root, given.agentId, kept) === null) {
      return refused(made.refused, made.by)
    }
    return refused(keptOnly(kept, draftArgument.said), made.by)
  }
  const asked = askedFor(placed.at, placed.on.at, made.roll, read(placed.on.at))
  const landed = await landing(
    given.root,
    [...asked, ...summedFor(made.sums, read)],
    `settle ${held.check} on ${placed.on.slug}`,
    { agentId: given.agentId, writer: given.writer, done }
  )
  if ("refusals" in landed) return keeping(done, refusedBy([...landed.refusals], DATA))
  return told(rowsOf(made, placed.on.slug, landed.commit))
}

export async function storySettle(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange,
  reach: Reach = INDEXED
): Promise<Answer> {
  return await answering(async (done) => await settledOn(done, argv, given, landing, reach))
}
