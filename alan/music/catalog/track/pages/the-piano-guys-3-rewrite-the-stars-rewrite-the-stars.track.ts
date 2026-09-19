import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3RewriteTheStarsRewriteTheStars = {
  id: "01a0afa2-1df1-7998-a54c-2fa0f9a1ddc6",
  type: "page-type/track",
  slug: "the-piano-guys-3-rewrite-the-stars-rewrite-the-stars",
  ownLength: 3.52555,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-rewrite-the-stars"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "163iPjMqMftS8AbK6INHqw",
      externalLink: "https://open.spotify.com/track/163iPjMqMftS8AbK6INHqw",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rewrite the Stars",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0qKRRwXdVtrVIEdPFr8vvo", artistName: "Benj Pasek" },
    { externalId: "1A2uplrPcSu6bqDaRp7Xs9", artistName: "Justin Paul" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey:
    "rewritethestars|0jW6R8CVyVohuUJVcuweDI,0qKRRwXdVtrVIEdPFr8vvo,1A2uplrPcSu6bqDaRp7Xs9|211533",
  song: "song/the-piano-guys-rewrite-the-stars",
} as const satisfies Track
