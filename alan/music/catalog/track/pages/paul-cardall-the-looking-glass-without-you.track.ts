import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassWithoutYou = {
  id: "01a0b4c8-60ae-7c7d-9f51-9700a502baa0",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-without-you",
  ownLength: 3.4257166666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3q9msLV4WwZoghu0Bm3YUg",
      externalLink: "https://open.spotify.com/track/3q9msLV4WwZoghu0Bm3YUg",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Without You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "withoutyou|7FQRbf8gbKw8KZQZAJWxH2|205543",
  song: "song/paul-cardall-without-you",
} as const satisfies Track
