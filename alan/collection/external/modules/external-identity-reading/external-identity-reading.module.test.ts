import { expect, test } from "bun:test"
import {
  identitiesIn,
  identitiesWith,
  identityFrom,
  idFrom,
  linkFrom,
  syncedFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"

const HELD = [
  {
    source: "musicbrainz",
    externalId: "484a4e90",
    externalLink: "https://musicbrainz.org/artist/484a4e90",
    lastSyncedAt: "2026-06-08",
  },
  { source: "spotify", externalId: "1WgXqy2Dd70QQOU7Ay074N" },
]

test("a record is found by the provider that record names", () => {
  expect(identityFrom(HELD, "spotify")?.externalId).toBe("1WgXqy2Dd70QQOU7Ay074N")
})

test("a collection stating no record of that provider answers with nothing", () => {
  expect(identityFrom(HELD, "trakt")).toBeNull()
  expect(idFrom(HELD, "trakt")).toBeNull()
})

test("the id of one provider is read apart from the id of another", () => {
  expect(idFrom(HELD, "musicbrainz")).toBe("484a4e90")
})

test("a field the record leaves out answers with nothing", () => {
  expect(linkFrom(HELD, "spotify")).toBeNull()
  expect(syncedFrom(HELD, "spotify")).toBeNull()
})

test("a link and a moment synced at are read off the record naming that provider", () => {
  expect(linkFrom(HELD, "musicbrainz")).toBe("https://musicbrainz.org/artist/484a4e90")
  expect(syncedFrom(HELD, "musicbrainz")).toBe("2026-06-08")
})

test("empty text is read as nothing", () => {
  expect(idFrom([{ source: "kindle", externalId: "" }], "kindle")).toBeNull()
})

test("a value that is no list of records is read as no record at all", () => {
  expect(identitiesIn(undefined)).toEqual([])
  expect(identitiesIn("musicbrainz")).toEqual([])
  expect(identitiesIn([null, "held"])).toEqual([])
  expect(idFrom(undefined, "kindle")).toBeNull()
})

test("a fresh record writes over the record the same provider held", () => {
  const folded = identitiesWith(HELD, { source: "spotify", externalId: "a-fresher-id" })
  expect(folded.filter((one) => one.source === "spotify")).toHaveLength(1)
  expect(idFrom(folded, "spotify")).toBe("a-fresher-id")
})

test("a fresh record leaves every other provider's record as that record was", () => {
  const folded = identitiesWith(HELD, { source: "spotify", externalId: "a-fresher-id" })
  expect(idFrom(folded, "musicbrainz")).toBe("484a4e90")
  expect(syncedFrom(folded, "musicbrainz")).toBe("2026-06-08")
})

test("records are ordered by the provider each one names", () => {
  const folded = identitiesWith(HELD, { source: "kindle", externalId: "a-kindle-id" })
  expect(folded.map((one) => one.source)).toEqual(["kindle", "musicbrainz", "spotify"])
})

test("a page holding no record at all is left holding the one fresh record", () => {
  expect(identitiesWith(undefined, { source: "spotify", externalId: "an-id" })).toEqual([
    { source: "spotify", externalId: "an-id" },
  ])
})
