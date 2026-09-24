import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForFortyDaysWhereYouThere = {
  id: "01a0b4c8-3a25-76fb-bb0c-8ba3178dd864",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-forty-days-where-you-there",
  ownLength: 5.28555,
  ownProgress: 5.28555,
  partOfCollections: ["release/paul-cardall-40-hymns-for-forty-days"],
  status: "completed",
  unit: "unit/minutes",
  title: "Where You There?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "whereyouthere|7FQRbf8gbKw8KZQZAJWxH2|317133",
  song: "song/paul-cardall-where-you-there",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-forty-days",
      discNumber: 1,
      position: 23,
      externalId: "20yGfhdzsj6ZlSs5Adx0aj",
      externalLink: "https://open.spotify.com/track/20yGfhdzsj6ZlSs5Adx0aj",
    },
  ],
} as const satisfies Track
