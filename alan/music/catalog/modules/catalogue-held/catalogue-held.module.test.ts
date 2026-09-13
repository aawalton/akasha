import { expect, test } from "bun:test"
import {
  flatlyHeld,
  withoutFlatIdentity,
} from "akasha/alan/music/catalog/modules/catalogue-held/catalogue-held.module.code.ts"

test("a flat id musicbrainz gave finds the artist holding it", () => {
  expect(flatlyHeld({ externalId: "mb1", source: "musicbrainz" }, "mb1")).toBe(true)
})

test("a flat id another provider gave finds no artist", () => {
  expect(flatlyHeld({ externalId: "mb1", source: "spotify" }, "mb1")).toBe(false)
})

test("a page naming no provider is found by nothing flat", () => {
  expect(flatlyHeld({ externalId: "mb1" }, "mb1")).toBe(false)
})

test("the flat keys a page holds are dropped before that page is stated again", () => {
  const held = {
    slug: "one",
    externalId: "mb1",
    externalLink: "https://musicbrainz.org/work/mb1",
    source: "musicbrainz",
    lastSyncedAt: "2026-09-02",
    rank: "A",
  }

  expect(withoutFlatIdentity(held)).toEqual({ slug: "one", rank: "A" })
})

test("a page holding no flat key is left as that page was", () => {
  expect(withoutFlatIdentity({ slug: "one" })).toEqual({ slug: "one" })
})
