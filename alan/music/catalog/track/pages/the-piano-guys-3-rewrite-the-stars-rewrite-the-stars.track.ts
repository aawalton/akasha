import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3RewriteTheStarsRewriteTheStars = {
  id: "01a0afa2-1df1-7998-a54c-2fa0f9a1ddc6",
  type: "page-type/track",
  slug: "the-piano-guys-3-rewrite-the-stars-rewrite-the-stars",
  ownLength: 3.52555,
  ownProgress: 3.52555,
  partOfCollections: ["release/the-piano-guys-3-rewrite-the-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rewrite the Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Benj Pasek" },
    { artistName: "Justin Paul" },
    { artist: "artist/the-piano-guys" },
  ],
  trackKey:
    "rewritethestars|0jW6R8CVyVohuUJVcuweDI,0qKRRwXdVtrVIEdPFr8vvo,1A2uplrPcSu6bqDaRp7Xs9|211533",
  song: "song/the-piano-guys-rewrite-the-stars",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-rewrite-the-stars",
      discNumber: 1,
      position: 1,
      externalId: "163iPjMqMftS8AbK6INHqw",
      externalLink: "https://open.spotify.com/track/163iPjMqMftS8AbK6INHqw",
    },
  ],
} as const satisfies Track
