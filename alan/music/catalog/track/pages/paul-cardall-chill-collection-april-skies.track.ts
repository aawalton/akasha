import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionAprilSkies = {
  id: "01a0b4c8-44b4-74d8-80f5-0659bb494d19",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-april-skies",
  ownLength: 3.581383333333333,
  ownProgress: 3.581383333333333,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "April Skies",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "aprilskies|7FQRbf8gbKw8KZQZAJWxH2|214883",
  song: "song/paul-cardall-april-skies",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 2,
      externalId: "2Z7iv9P7XkmJhIVldZnXfE",
      externalLink: "https://open.spotify.com/track/2Z7iv9P7XkmJhIVldZnXfE",
    },
  ],
} as const satisfies Track
