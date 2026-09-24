import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenNovember = {
  id: "01a0b4c8-4ab7-7dd2-ae86-d7eaff059477",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-november",
  ownLength: 3.4428833333333335,
  ownProgress: 3.4428833333333335,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "November",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "november|7FQRbf8gbKw8KZQZAJWxH2|206573",
  song: "song/paul-cardall-november",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 12,
      externalId: "5OgEuU4RcVUhxAlJyuy8xQ",
      externalLink: "https://open.spotify.com/track/5OgEuU4RcVUhxAlJyuy8xQ",
    },
  ],
} as const satisfies Track
