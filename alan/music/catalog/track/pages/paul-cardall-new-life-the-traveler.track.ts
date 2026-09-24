import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeTheTraveler = {
  id: "01a0b4c8-3ea2-7e9a-a39d-3968feba7332",
  type: "page-type/track",
  slug: "paul-cardall-new-life-the-traveler",
  ownLength: 1.6971,
  ownProgress: 1.6971,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Traveler",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thetraveler|7FQRbf8gbKw8KZQZAJWxH2|101826",
  song: "song/paul-cardall-the-traveler",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 1,
      externalId: "1oMBWc9ad1NGtGufOkB5X2",
      externalLink: "https://open.spotify.com/track/1oMBWc9ad1NGtGufOkB5X2",
    },
  ],
} as const satisfies Track
