import { expect, test } from "bun:test"
import { dayGiven, type ResolvedReadout } from "./readout-resolver.ts"
import type { ReadoutQuery } from "./readout-catalog.ts"
import { getEsoDayStr } from "../tools/lib/eso-day.ts"

// A day far enough back that it can never be the day the clock stands on.
const PAST_DAY = "2026-03-05"

function queryOf(one: Partial<ReadoutQuery>): ReadoutQuery {
  return {
    slug: "a-query",
    takes: {},
    reducesToOneNumber: false,
    pageTypeSlug: "food-entry",
    keys: [],
    answersOnlyForNow: false,
    ...one,
  }
}

function readoutOf(query: ReadoutQuery): ResolvedReadout {
  return {
    slug: "a-readout",
    label: "A readout",
    unit: "",
    place: 0,
    scale: { slug: "green-day-units" },
    querySlug: query.slug,
    queryKey: null,
    earnedKey: null,
    wireKey: "a-readout",
    keyArgument: null,
    query,
  }
}

test("a clock-relative query taking no day refuses a day that is not today", () => {
  const query = queryOf({ answersOnlyForNow: true })
  expect(() => dayGiven(readoutOf(query), query, PAST_DAY)).toThrow(
    /can only answer for/
  )
})

test("the refusal names the day asked for, so the record says which day went unanswered", () => {
  const query = queryOf({ answersOnlyForNow: true })
  expect(() => dayGiven(readoutOf(query), query, PAST_DAY)).toThrow(new RegExp(PAST_DAY))
})

test("a clock-relative query taking no day still answers for the day the clock stands on", () => {
  const query = queryOf({ answersOnlyForNow: true })
  expect(dayGiven(readoutOf(query), query, getEsoDayStr(new Date()))).toEqual({})
})

test("a query taking no day and reaching no clock answers for any day, as it always did", () => {
  const query = queryOf({ answersOnlyForNow: false })
  expect(dayGiven(readoutOf(query), query, PAST_DAY)).toEqual({})
})

test("a query that takes a day is handed the day asked for, clock-relative or not", () => {
  const query = queryOf({ takes: { date: "calendar-date" }, answersOnlyForNow: true })
  expect(dayGiven(readoutOf(query), query, PAST_DAY)).toEqual({ date: PAST_DAY })
})
