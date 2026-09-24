import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassHuntersHeart = {
  id: "01a0b4c8-6133-7718-8cb4-4dbc591dbf06",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-hunters-heart",
  ownLength: 2.9562166666666667,
  ownProgress: 2.9562166666666667,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hunter's Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "huntersheart|7FQRbf8gbKw8KZQZAJWxH2|177373",
  song: "song/paul-cardall-hunters-heart",
  carriedBy: [
    {
      release: "release/paul-cardall-the-looking-glass",
      discNumber: 1,
      position: 8,
      externalId: "3laGlD2PfzC2CbZESRAONs",
      externalLink: "https://open.spotify.com/track/3laGlD2PfzC2CbZESRAONs",
    },
  ],
} as const satisfies Track
