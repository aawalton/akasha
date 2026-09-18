import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollectionTheFirstNoel = {
  id: "01a0b4c8-41da-7032-8558-77fedb991414",
  type: "page-type/track",
  slug: "paul-cardall-a-sacred-christmas-piano-collection-the-first-noel",
  ownLength: 2.7472,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-sacred-christmas-piano-collection"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kGRP2a9RzSpbX5E2SkSo8",
      externalLink: "https://open.spotify.com/track/4kGRP2a9RzSpbX5E2SkSo8",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The First Noel",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thefirstnoel|7FQRbf8gbKw8KZQZAJWxH2|164832",
} as const satisfies Track
