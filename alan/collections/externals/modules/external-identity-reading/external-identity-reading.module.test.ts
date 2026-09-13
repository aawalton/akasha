import { expect, test } from "bun:test"
import {
  identitiesIn,
  identityFrom,
  idFrom,
  linkFrom,
  syncedFrom,
} from "akasha/alan/collections/externals/modules/external-identity-reading/external-identity-reading.module.code.ts"

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
