import { expect, test } from "bun:test"
import { filledBy, holesIn, unfilledIn } from "./named-for.ts"

const held = (values: Readonly<Record<string, string>>) => (key: string) => values[key] ?? null

test("a rule fills from what its holes name, and the whole is stemmed", () => {
  expect(filledBy("{persona-slug}-{slug}", held({ "persona-slug": "Amy", slug: "Rest Day" }))).toBe(
    "amy-rest-day"
  )
})

test("a rule with no hole is its own stem", () => {
  expect(filledBy("anchor", held({}))).toBe("anchor")
})

test("a hole nothing fills makes the whole render null, not a name with a gap in it", () => {
  expect(filledBy("{date}-{title}", held({ date: "2026-08-20" }))).toBeNull()
})

test("a rule filling only to what no name can carry renders null too", () => {
  expect(filledBy("{title}", held({ title: "!!!" }))).toBeNull()
})

test("the holes to blame are the ones nothing filled", () => {
  expect(unfilledIn("{date}-{title}", held({ date: "2026-08-20" }))).toEqual(["title"])
})

test("where every hole filled and the render still came to nothing, every hole is to blame", () => {
  expect(unfilledIn("{title}", held({ title: "!!!" }))).toEqual(["title"])
})

test("a rule's holes are read in the order they stand in it", () => {
  expect(holesIn("{persona-slug}-l{relationship-level}-{eso-day}")).toEqual([
    "persona-slug",
    "relationship-level",
    "eso-day",
  ])
  expect(holesIn("anchor")).toEqual([])
})
