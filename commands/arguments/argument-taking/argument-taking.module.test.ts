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
