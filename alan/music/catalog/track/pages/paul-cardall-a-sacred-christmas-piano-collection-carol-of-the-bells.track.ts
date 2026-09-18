import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollectionCarolOfTheBells = {
  id: "01a0b4c8-4175-7048-86fd-a737ea1efd4a",
  type: "page-type/track",
  slug: "paul-cardall-a-sacred-christmas-piano-collection-carol-of-the-bells",
  ownLength: 5.410383333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-sacred-christmas-piano-collection"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7obd1S9jLZXy5dYxurctD1",
      externalLink: "https://open.spotify.com/track/7obd1S9jLZXy5dYxurctD1",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Carol of the Bells",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "carolofthebells|7FQRbf8gbKw8KZQZAJWxH2|324623",
} as const satisfies Track
