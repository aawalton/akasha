import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDailyDevotionsHowGreatThouArt = {
  id: "01a0b4c8-5d7f-7909-8478-5bb28dab9d8e",
  type: "page-type/track",
  slug: "paul-cardall-daily-devotions-how-great-thou-art",
  ownLength: 3.422433333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-daily-devotions"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7FPzzAixjzW9zNWDujBJ2u",
      externalLink: "https://open.spotify.com/track/7FPzzAixjzW9zNWDujBJ2u",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "How Great Thou Art",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "howgreatthouart|7FQRbf8gbKw8KZQZAJWxH2|205346",
} as const satisfies Track
