import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationTheFall = {
  id: "01a0b4c8-3595-7b85-bc71-dd020b97451b",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-the-fall",
  ownLength: 5.374666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55aQ3WzLa2LEGbv8k3whgD",
      externalLink: "https://open.spotify.com/track/55aQ3WzLa2LEGbv8k3whgD",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Fall",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thefall|7FQRbf8gbKw8KZQZAJWxH2|322480",
  song: "song/paul-cardall-the-fall",
} as const satisfies Track
