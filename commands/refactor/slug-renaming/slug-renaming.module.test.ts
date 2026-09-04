import { expect, test } from "bun:test"
import type { Listed } from "@akasha/indexes"
import { pairFor, passedOn } from "./slug-renaming.module.code.ts"

const AT = "akasha/one/held.thing.ts"

const THERE = "akasha/one/renamed.thing.ts"

const AAAA = "01a04bed-1450-7000-8000-00000000aaaa"

const HELD: readonly Listed[] = [{ path: AT, id: AAAA }]

const listing = (pageTypeSlug: string, slug: string): readonly Listed[] =>
  pageTypeSlug === "thing" && slug === "held" ? HELD : []

function said(named: string): string {
  const asked = pairFor(named, "renamed", listing)
  return "refused" in asked ? asked.refused : `${asked.pair.from} -> ${asked.pair.to}`
}

test("a page is named by the address it is at, and its file arrives under the new slug", () => {
  expect(said("thing/held")).toBe(`${AT} -> ${THERE}`)
  expect(said("held")).toContain("names no page type")
  expect(said("page-type/thing")).toContain("rename page-type")
  expect(said("thing/other")).toContain("no `thing` carries the slug `other`")
})

test("an index that will not answer refuses, and so does an address two pages answer", () => {
  const thrown = pairFor("thing/held", "renamed", () => {
    throw new Error("the index is not there")
  })
  expect("refused" in thrown ? thrown.refused : "").toBe("the index is not there")
  const two = pairFor("thing/held", "renamed", () => [...HELD, { path: AT, id: AAAA }])
  expect("refused" in two ? two.refused : "").toContain("2 pages carry")
})

test("the flags a call said are carried on but for the two naming the page", () => {
  const pair = { from: AT, to: THERE, was: "held" }
  const rest = ["--from", "thing/held", "--to", "renamed", "--dry-run"]
  expect(passedOn(pair, "renamed", rest)).toEqual([
    "--from",
    AT,
    "--to",
    THERE,
    "--dry-run",
    "--message",
    "rename the page `held` to `renamed`",
  ])
  expect(passedOn(pair, "renamed", ["--message", "said"])).toEqual([
    "--from",
    AT,
    "--to",
    THERE,
    "--message",
    "said",
  ])
})
