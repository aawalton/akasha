import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsINeedTheeEveryHour = {
  id: "01a0b4c8-6456-75c3-a3fe-f0deac0f6932",
  type: "page-type/track",
  slug: "paul-cardall-hymns-i-need-thee-every-hour",
  ownLength: 3.3431,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1oVGrGvfeoDaCtcHjGTm2g",
      externalLink: "https://open.spotify.com/track/1oVGrGvfeoDaCtcHjGTm2g",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I Need Thee Every Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "ineedtheeeveryhour|7FQRbf8gbKw8KZQZAJWxH2|200586",
  song: "song/paul-cardall-i-need-thee-every-hour",
} as const satisfies Track
