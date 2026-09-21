import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForFortyDaysInTheGarden = {
  id: "01a0b4c8-396d-7871-9b3b-40fca03052bb",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-forty-days-in-the-garden",
  ownLength: 2.056,
  ownProgress: 2.056,
  partOfCollections: ["release/paul-cardall-40-hymns-for-forty-days"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zna6DjHTVokUeVUjCK242",
      externalLink: "https://open.spotify.com/track/6zna6DjHTVokUeVUjCK242",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "In the Garden",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "inthegarden|7FQRbf8gbKw8KZQZAJWxH2|123360",
  song: "song/paul-cardall-in-the-garden",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-forty-days",
      discNumber: 1,
      position: 18,
      externalId: "6zna6DjHTVokUeVUjCK242",
      externalLink: "https://open.spotify.com/track/6zna6DjHTVokUeVUjCK242",
    },
  ],
} as const satisfies Track
