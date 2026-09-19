import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationWhereTheresLove = {
  id: "01a0b4c8-370a-7e79-8a70-5564e6f8925a",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-where-theres-love",
  ownLength: 3.7371,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2bBUannItBxVnfl5KecDhn",
      externalLink: "https://open.spotify.com/track/2bBUannItBxVnfl5KecDhn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Where There's Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "wherethereslove|7FQRbf8gbKw8KZQZAJWxH2|224226",
  song: "song/paul-cardall-where-theres-love",
} as const satisfies Track
