import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulEmbraced = {
  id: "01a0b4c8-5a4d-7dfb-b679-c25c3eb98262",
  type: "page-type/track",
  slug: "paul-cardall-faithful-embraced",
  ownLength: 3.1886666666666668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5v79fMb22xFB4DnycoaLOE",
      externalLink: "https://open.spotify.com/track/5v79fMb22xFB4DnycoaLOE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Embraced",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "embraced|7FQRbf8gbKw8KZQZAJWxH2|191320",
  song: "song/paul-cardall-embraced",
} as const satisfies Track
