import { expect, test } from "bun:test"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  LIMIT_PAGE,
  NAMING_NONE,
  NAMING_NOT_WITH,
  NAMING_ONE_OF,
  NAMING_TAIL,
  NAMING_THEM,
  NAMING_WORD,
  PAGES,
  pageRefusals,
  pageTaken,
  SEAT_PAGE,
  TAIL_PAGE,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"

test("a command page's entries are read against the argument pages its code names", () => {
  expect(pageTaken(["--seat", "athena"], NAMING_THEM, PAGES)).toEqual({
    seat: "athena",
    dryRun: false,
    to: [],
  })
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
  expect(pageRefusals([], NAMING_THEM, PAGES)[0]).toBe(
    "`akasha thing` takes `--seat`, and nothing said it"
  )
})

test("how a command page says a call fills an argument is carried to the reader", () => {
  const read = takenFor(["athena"], "akasha thing", NAMING_WORD, [SEAT_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken.seat).toBe("athena")
})

test("a command page's group is read from the entries that page states", () => {
  expect(pageRefusals([], NAMING_ONE_OF, [SEAT_PAGE, LIMIT_PAGE])).toEqual([
    "`akasha thing` takes `--seat` or `--limit`, and nothing said either",
  ])
})

test("two arguments a command page says are never said together are refused", () => {
  const said = pageRefusals(["--seat", "a", "--limit", "1"], NAMING_NOT_WITH, [
    SEAT_PAGE,
    LIMIT_PAGE,
  ])
  expect(said[0]).toBe("`--seat` and `--limit` are never said together, and this call says both")
})

test("a command page naming no argument is answered with nothing taken", () => {
  expect(pageTaken([], NAMING_NONE, [])).toEqual({})
})

test("an argument page carrying a default is answered with it where no call says it", () => {
  const read = takenFor([], "akasha thing", NAMING_TAIL, [TAIL_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  const tail: number = read.taken.tail
  expect(tail).toBe(100)
})

test("a call saying an argument takes that value over the default", () => {
  const read = takenFor(["--tail", "7"], "akasha thing", NAMING_TAIL, [TAIL_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  expect(read.taken.tail).toBe(7)
})

const NAMING_ONLY_ONE = {
  slug: "thing",
  arguments: [
    { argument: "argument/seat", notWith: ["argument/limit"], oneOf: ["argument/limit"] },
    { argument: "argument/limit", notWith: ["argument/seat"], oneOf: ["argument/seat"] },
  ],
} as const

const NAMING_EITHER = {
  slug: "thing",
  arguments: [
    { argument: "argument/seat", oneOf: ["argument/limit"] },
    { argument: "argument/limit", oneOf: ["argument/seat"] },
  ],
} as const

test("a group forbidding its pair narrows to the member a call said", () => {
  const read = takenFor(["--seat", "a"], "akasha thing", NAMING_ONLY_ONE, [SEAT_PAGE, LIMIT_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  const taken = read.taken
  if (taken.limit !== undefined) throw new Error("the limit was said")
  const seat: string = taken.seat
  expect(seat).toBe("a")
})

test("a group forbidding its pair narrows the other way round", () => {
  const read = takenFor(["--limit", "2"], "akasha thing", NAMING_ONLY_ONE, [SEAT_PAGE, LIMIT_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  const taken = read.taken
  if (taken.seat !== undefined) throw new Error("the seat was said")
  const limit: number = taken.limit
  expect(limit).toBe(2)
})

test("a group forbidding nothing is answered as two a call may leave out", () => {
  const read = takenFor(["--seat", "a"], "akasha thing", NAMING_EITHER, [SEAT_PAGE, LIMIT_PAGE])
  if ("refused" in read) throw new Error(read.refused.join("; "))
  const seat: string | undefined = read.taken.seat
  expect(seat).toBe("a")
})
