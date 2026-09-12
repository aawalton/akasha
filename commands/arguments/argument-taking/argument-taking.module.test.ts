import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import type {
  Naming,
  Taken,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  takenFor,
  takingIn,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"

function argumentOf(slug: string, value: Argument["value"], repeats?: boolean): Argument {
  return {
    id: "01a09400-0000-7000-8000-000000000000",
    type: "argument",
    slug,
    said: `--${slug}`,
    takes: `what ${slug} is for`,
    value,
    ...(repeats === undefined ? {} : { repeats }),
  } as Argument
}

const DRY_RUN: Naming = { argument: argumentOf("dry-run", "none") }

const LIMIT: Naming = { argument: argumentOf("limit", "whole-number") }

const TO: Naming = { argument: argumentOf("to", "text", true) }

const ACTIVE: Naming = { argument: argumentOf("active", "true-or-false") }

const NODE: Naming = { argument: argumentOf("node", "text"), saidAs: "flag-or-word" }

const SLUG: Naming = { argument: argumentOf("slug", "text"), saidAs: "word" }

const VIDEO = argumentOf("video", "path")

const FRAMES_DIR = argumentOf("frames-dir", "path")

const ONE_OF_THEM: readonly Naming[] = [
  { argument: VIDEO, notWith: [FRAMES_DIR] },
  { argument: FRAMES_DIR },
]

function taken(argv: readonly string[], naming: readonly Naming[]): Taken {
  const read = takingIn(argv, "akasha thing", naming)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  return read.taken
}

function refusals(argv: readonly string[], naming: readonly Naming[]): readonly string[] {
  const read = takingIn(argv, "akasha thing", naming)
  if (!("refused" in read)) throw new Error("this was read rather than refused")
  return read.refused
}

test("an argument carrying no value is true where it is said and false where it is not", () => {
  expect(taken(["--dry-run"], [DRY_RUN])).toEqual({ dryRun: true })
  expect(taken([], [DRY_RUN])).toEqual({ dryRun: false })
})

test("a whole number is read as a number", () => {
  expect(taken(["--limit", "5"], [LIMIT])).toEqual({ limit: 5 })
})

test("true or false is read as true or false", () => {
  expect(taken(["--active", "false"], [ACTIVE])).toEqual({ active: false })
})

test("a repeating argument gathers its values in the order the values are said", () => {
  expect(taken(["--to", "a", "--to", "b"], [TO])).toEqual({ to: ["a", "b"] })
})

test("a repeating argument nothing said is an empty list", () => {
  expect(taken([], [TO])).toEqual({ to: [] })
})

test("an argument's key is its slug written in camel", () => {
  expect(Object.keys(taken(["--dry-run"], [DRY_RUN]))).toEqual(["dryRun"])
})

test("an argument no page names is refused, and the refusal names what the command takes", () => {
  expect(refusals(["--nope"], [DRY_RUN])[0]).toBe(
    "`--nope` is no argument `akasha thing` takes — it takes `--dry-run`"
  )
})

test("a command naming no argument refuses every word", () => {
  expect(refusals(["--nope"], [])[0]).toBe(
    "`--nope` is no argument `akasha thing` takes, and it takes none"
  )
})

test("an argument whose value is another argument is an argument no value follows", () => {
  expect(refusals(["--limit", "--dry-run"], [LIMIT, DRY_RUN])[0]).toBe(
    "`--limit` takes a value, and none follows it"
  )
})

test("an argument that does not repeat is refused where one call says it twice", () => {
  expect(refusals(["--limit", "1", "--limit", "2"], [LIMIT])[0]).toBe(
    "`--limit` is said twice, and one call says it once"
  )
})

test("a value that is no whole number is refused", () => {
  expect(refusals(["--limit", "many"], [LIMIT])[0]).toBe(
    "`--limit many` is no whole number of nought or more"
  )
})

test("a value that is neither true nor false is refused", () => {
  expect(refusals(["--active", "yes"], [ACTIVE])[0]).toBe(
    "`--active` takes `true` or `false`, and `yes` is neither"
  )
})

test("an argument the command needs and nothing said is refused", () => {
  expect(refusals([], [{ ...LIMIT, required: true }])[0]).toBe(
    "`akasha thing` takes `--limit`, and nothing said it"
  )
})

test("an argument the command needs is not refused where the call says it", () => {
  expect(taken(["--limit", "3"], [{ ...LIMIT, required: true }])).toEqual({ limit: 3 })
})

test("every refusal a call earns is gathered rather than the first alone", () => {
  expect(refusals(["--nope", "--limit", "many"], [LIMIT])).toEqual([
    "`--nope` is no argument `akasha thing` takes — it takes `--limit`",
    "`--limit many` is no whole number of nought or more",
  ])
})

test("a word that is no flag fills the argument the command takes as a word", () => {
  expect(taken(["n1"], [NODE])).toEqual({ node: "n1" })
})

test("an argument taken as a word is taken at its flag too", () => {
  expect(taken(["--node", "n1"], [NODE])).toEqual({ node: "n1" })
})

test("an argument said as a word and at its flag in one call is refused", () => {
  expect(refusals(["n1", "--node", "n2"], [NODE])[0]).toBe(
    "`--node` is said as a word and at its flag, and one call says it one way"
  )
})

test("a second word is refused where that argument does not repeat", () => {
  expect(refusals(["n1", "n2"], [NODE])[0]).toBe(
    "`--node` is said twice, and one call says it once"
  )
})

test("a word spelled as a flag is refused rather than filling an argument", () => {
  expect(refusals(["--nope"], [NODE])[0]).toBe(
    "`--nope` is no argument `akasha thing` takes — it takes `--node`"
  )
})

test("a word fills an argument the command needs", () => {
  expect(taken(["n1"], [{ ...NODE, required: true }])).toEqual({ node: "n1" })
})

test("a word is refused where the command takes no argument as a word", () => {
  expect(refusals(["n1"], [LIMIT])[0]).toBe(
    "`n1` is no argument `akasha thing` takes — it takes `--limit`"
  )
})

test("two arguments one call may not say together are refused where a call says both", () => {
  expect(refusals(["--video", "a.mp4", "--frames-dir", "frames"], ONE_OF_THEM)[0]).toBe(
    "`--video` and `--frames-dir` are never said together, and this call says both"
  )
})

test("two arguments one call may not say together are read where a call says one", () => {
  expect(taken(["--video", "a.mp4"], ONE_OF_THEM)).toEqual({ video: "a.mp4" })
})

test("a pair both entries state is refused once", () => {
  const each: readonly Naming[] = [
    { argument: VIDEO, notWith: [FRAMES_DIR] },
    { argument: FRAMES_DIR, notWith: [VIDEO] },
  ]
  expect(refusals(["--video", "a.mp4", "--frames-dir", "frames"], each)).toEqual([
    "`--video` and `--frames-dir` are never said together, and this call says both",
  ])
})

test("an argument said as a word alone is filled by a word", () => {
  expect(taken(["one"], [SLUG])).toEqual({ slug: "one" })
})

test("an argument said as a word alone is not taken at a flag", () => {
  expect(refusals(["--slug", "one"], [SLUG])[0]).toBe(
    "`--slug` is no argument `akasha thing` takes — it takes `<slug>`"
  )
})

test("an argument said as a word alone is named as a word where the command needs it", () => {
  expect(refusals([], [{ ...SLUG, required: true }])[0]).toBe(
    "`akasha thing` takes `<slug>`, and nothing said it"
  )
})

test("an argument said as a word alone is named by the placeholder it states", () => {
  const placed: Naming = {
    argument: { ...argumentOf("node", "text"), placeholder: "id" } as Argument,
    saidAs: "word",
    required: true,
  }
  expect(refusals([], [placed])[0]).toBe("`akasha thing` takes `<id>`, and nothing said it")
})

const DRY_RUN_PAGE = {
  id: "01a09400-0000-7000-8000-000000000001",
  type: "argument",
  slug: "dry-run",
  said: "--dry-run",
  takes: "what dry-run is for",
  value: "none",
} as const satisfies Argument

const SEAT_PAGE = {
  id: "01a09400-0000-7000-8000-000000000002",
  type: "argument",
  slug: "seat",
  said: "--seat",
  takes: "what seat is for",
  value: "text",
} as const satisfies Argument

const LIMIT_PAGE = {
  id: "01a09400-0000-7000-8000-000000000003",
  type: "argument",
  slug: "limit",
  said: "--limit",
  takes: "what limit is for",
  value: "whole-number",
} as const satisfies Argument

const TO_PAGE = {
  id: "01a09400-0000-7000-8000-000000000004",
  type: "argument",
  slug: "to",
  said: "--to",
  takes: "what to is for",
  value: "text",
  repeats: true,
} as const satisfies Argument

const PAGES = [DRY_RUN_PAGE, SEAT_PAGE, LIMIT_PAGE, TO_PAGE]

const NAMING_THEM = {
  slug: "thing",
  arguments: [
    { argument: "argument/dry-run" },
    { argument: "argument/seat", required: true },
    { argument: "argument/limit" },
    { argument: "argument/to" },
  ],
} as const

const NAMING_NONE = { slug: "nothing" } as const

test("a command page's entries are read against the argument pages its code names", () => {
  const read = takenFor(["--seat", "athena"], "akasha thing", NAMING_THEM, PAGES)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken).toEqual({ seat: "athena", dryRun: false, to: [] })
})

test("what a command page names is answered under those keys and typed as the pages say", () => {
  const read = takenFor(["--seat", "athena", "--limit", "2"], "akasha thing", NAMING_THEM, PAGES)
  if ("refused" in read) throw new Error(read.refused.join("; "))
  const seat: string = read.taken.seat
  const dry: boolean = read.taken.dryRun
  const limit: number | undefined = read.taken.limit
  const to: readonly string[] = read.taken.to
  expect([seat, dry, limit, to]).toEqual(["athena", false, 2, []])
})

test("an argument the command page needs is refused where nothing said it", () => {
  const read = takenFor([], "akasha thing", NAMING_THEM, PAGES)
  if (!("refused" in read)) throw new Error("this was read rather than refused")
  expect(read.refused[0]).toBe("`akasha thing` takes `--seat`, and nothing said it")
})

test("how a command page says a call fills an argument is carried to the reader", () => {
  const page = {
    slug: "thing",
    arguments: [{ argument: "argument/seat", required: true, saidAs: "word" }],
  } as const
  const read = takenFor(["athena"], "akasha thing", page, [SEAT_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken.seat).toBe("athena")
})

test("two arguments a command page says are never said together are refused", () => {
  const page = {
    slug: "thing",
    arguments: [
      { argument: "argument/seat", notWith: ["argument/limit"] },
      { argument: "argument/limit" },
    ],
  } as const
  const read = takenFor(["--seat", "a", "--limit", "1"], "akasha thing", page, [
    SEAT_PAGE,
    LIMIT_PAGE,
  ])
  if (!("refused" in read)) throw new Error("this was read rather than refused")
  expect(read.refused[0]).toBe(
    "`--seat` and `--limit` are never said together, and this call says both"
  )
})

test("a command page naming no argument is answered with nothing taken", () => {
  const read = takenFor([], "akasha thing", NAMING_NONE, [])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken).toEqual({})
})

test("a word argument and a flag argument may not be said together", () => {
  const ids = argumentOf("agent-id", "text", true)
  const state = argumentOf("state", "text", true)
  const each: readonly Naming[] = [
    { argument: ids, saidAs: "word", notWith: [state] },
    { argument: state },
  ]
  expect(refusals(["a1", "--state", "working"], each)[0]).toBe(
    "`<agent-id>` and `--state` are never said together, and this call says both"
  )
})
