import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionBackToLA = {
  id: "01a0b4c8-46a1-7801-aca7-ecc72cc8d5c5",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-back-to-l-a",
  ownLength: 2.0693333333333332,
  ownProgress: 2.0693333333333332,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Back to L.A.",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "backtola|7FQRbf8gbKw8KZQZAJWxH2|124160",
  song: "song/paul-cardall-back-to-l-a",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 16,
      externalId: "6TzJRZIMdLXP6ZevAJLnKT",
      externalLink: "https://open.spotify.com/track/6TzJRZIMdLXP6ZevAJLnKT",
    },
  ],
} as const satisfies Track
