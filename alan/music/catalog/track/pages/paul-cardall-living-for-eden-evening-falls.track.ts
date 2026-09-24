import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenEveningFalls = {
  id: "01a0b4c8-4b4c-7c3c-860b-61f6f75111b8",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-evening-falls",
  ownLength: 2.944,
  ownProgress: 2.944,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Evening Falls",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "eveningfalls|7FQRbf8gbKw8KZQZAJWxH2|176640",
  song: "song/paul-cardall-evening-falls",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 16,
      externalId: "4QPEDogXbGpy9wcFs4cJca",
      externalLink: "https://open.spotify.com/track/4QPEDogXbGpy9wcFs4cJca",
    },
  ],
} as const satisfies Track
