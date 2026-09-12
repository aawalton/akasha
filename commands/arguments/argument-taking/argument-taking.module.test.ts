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
import {
  ACTIVE,
  argumentOf,
  DRY_RUN,
  FRAMES_DIR,
  FROM,
  LIMIT,
  LIMIT_PAGE,
  NAMING_NONE,
  NAMING_THEM,
  NODE,
  ONE_OF_THEM,
  ONTO,
  PAGES,
  REST,
  SEAT_PAGE,
  SLUG,
  TO,
  VIDEO,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"

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

test("a flag the command takes no argument at is refused rather than filling the one before it", () => {
  expect(refusals(["--limit", "--nope"], [LIMIT])).toEqual([
    "`--limit` takes a value, and none follows it",
    "`--nope` is no argument `akasha thing` takes — it takes `--limit`",
  ])
})

test("a value opening with one dash is a value rather than a flag", () => {
  expect(taken(["--node", "-5"], [NODE])).toEqual({ node: "-5" })
})

test("a value that is one dash is a value, which is how a call names what is piped in", () => {
  expect(taken(["--node", "-"], [NODE])).toEqual({ node: "-" })
})

test("an argument the command names where a value goes is refused whatever it is spelled", () => {
  const dash: Naming = { argument: { ...argumentOf("short", "text"), said: "-s" } as Argument }
  expect(refusals(["--limit", "-s"], [LIMIT, dash])[0]).toBe(
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

test("a second word is refused where the command takes one word", () => {
  expect(refusals(["n1", "n2"], [NODE])[0]).toBe(
    "`akasha thing` takes 1 word and this call says 2 words"
  )
})

test("two words fill the two word arguments in the order the command names them", () => {
  expect(taken(["here", "there"], [FROM, ONTO])).toEqual({ from: "here", onto: "there" })
})

test("three words fill the three word arguments in the order the command names them", () => {
  expect(taken(["here", "said", "there"], [FROM, SLUG, ONTO])).toEqual({
    from: "here",
    slug: "said",
    onto: "there",
  })
})

test("a call saying fewer words than the command takes is refused by the one left unsaid", () => {
  expect(refusals(["here"], [FROM, { ...ONTO, required: true }])[0]).toBe(
    "`akasha thing` takes `<onto>`, and nothing said it"
  )
})

test("a call saying more words than the command takes says how many either side is", () => {
  expect(refusals(["here", "there", "spare"], [FROM, ONTO])[0]).toBe(
    "`akasha thing` takes 2 words and this call says 3 words"
  )
})

test("a repeating word argument takes every word from its own place on", () => {
  expect(taken(["here", "one", "two"], [FROM, REST])).toEqual({
    from: "here",
    rest: ["one", "two"],
  })
})

test("a bare double dash makes every word after it a word rather than a flag", () => {
  expect(taken(["--", "--json"], [NODE])).toEqual({ node: "--json" })
})

test("words after a bare double dash fill the word arguments in the order they are named", () => {
  expect(taken(["--", "here", "there"], [FROM, ONTO])).toEqual({ from: "here", onto: "there" })
})

test("a double dash after the first is a word rather than another separator", () => {
  expect(taken(["--", "--"], [NODE])).toEqual({ node: "--" })
})

test("an argument said with an equals carries what follows the first equals", () => {
  expect(taken(["--node=n1"], [NODE])).toEqual({ node: "n1" })
  expect(taken(["--limit=5"], [LIMIT])).toEqual({ limit: 5 })
})

test("a value written after the equals keeps every equals in it", () => {
  expect(taken(["--node=a=b"], [NODE])).toEqual({ node: "a=b" })
})

test("a value opening with two dashes is handed to a flag written with an equals", () => {
  expect(taken(["--node=--weird"], [NODE])).toEqual({ node: "--weird" })
})

test("a value written after the equals may be empty", () => {
  expect(taken(["--node="], [NODE])).toEqual({ node: "" })
})

test("an argument carrying no value is refused where a call writes an equals after it", () => {
  expect(refusals(["--dry-run=yes"], [DRY_RUN])[0]).toBe(
    "`--dry-run` carries no value, and `--dry-run=yes` names one"
  )
})

test("an equals after a flag the command takes no argument at is refused whole", () => {
  expect(refusals(["--nope=1"], [LIMIT])[0]).toBe(
    "`--nope=1` is no argument `akasha thing` takes — it takes `--limit`"
  )
})

test("a word said after a bare double dash keeps an equals in it", () => {
  expect(taken(["--", "--node=n1"], [NODE])).toEqual({ node: "--node=n1" })
})

test("a word that is no flag keeps an equals in it", () => {
  expect(taken(["a=b"], [NODE])).toEqual({ node: "a=b" })
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
  const ids = argumentOf("agent-id", "text")
  const state = argumentOf("state", "text")
  const each: readonly Naming[] = [
    { argument: ids, repeats: true, saidAs: "word", notWith: [state] },
    { argument: state, repeats: true },
  ]
  expect(refusals(["a1", "--state", "working"], each)[0]).toBe(
    "`<agent-id>` and `--state` are never said together, and this call says both"
  )
})
