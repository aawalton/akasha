import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import type {
  Naming,
  Taken,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { takingIn } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"

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
