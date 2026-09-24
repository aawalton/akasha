import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightSanktaLucia = {
  id: "01a0aa7c-3946-7234-a85a-5ddcd1483f6a",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-sankta-lucia",
  ownLength: 1.37555,
  ownProgress: 1.37555,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sankta Lucia",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "sanktalucia|1Xylc3o4UrD53lo9CvFvVg|82533",
  song: "song/zara-larsson-sankta-lucia",
  carriedBy: [
    {
      release: "release/zara-larsson-honor-the-light",
      discNumber: 1,
      position: 6,
      externalId: "4IsV7HoiBe2lPQ8FLnUVVK",
      externalLink: "https://open.spotify.com/track/4IsV7HoiBe2lPQ8FLnUVVK",
    },
  ],
} as const satisfies Track
