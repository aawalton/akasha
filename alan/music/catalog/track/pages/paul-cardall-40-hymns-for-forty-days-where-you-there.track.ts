import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForFortyDaysWhereYouThere = {
  id: "01a0b4c8-3a25-76fb-bb0c-8ba3178dd864",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-forty-days-where-you-there",
  ownLength: 5.28555,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-forty-days"],
  position: 23,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20yGfhdzsj6ZlSs5Adx0aj",
      externalLink: "https://open.spotify.com/track/20yGfhdzsj6ZlSs5Adx0aj",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Where You There?",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "whereyouthere|7FQRbf8gbKw8KZQZAJWxH2|317133",
  song: "song/paul-cardall-where-you-there",
} as const satisfies Track
