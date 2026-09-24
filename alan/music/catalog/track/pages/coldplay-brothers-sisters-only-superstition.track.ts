import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayBrothersSistersOnlySuperstition = {
  id: "01a0b9ef-05ab-75e6-809c-2368d9847a5f",
  type: "page-type/track",
  slug: "coldplay-brothers-sisters-only-superstition",
  ownLength: 3.8111,
  ownProgress: 3.8111,
  partOfCollections: ["release/coldplay-brothers-sisters"],
  status: "completed",
  unit: "unit/minutes",
  title: "Only Superstition",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "onlysuperstition|4gzpq5DPGxSnKTe4SA8HAU|228666",
  song: "song/coldplay-only-superstition",
  carriedBy: [
    {
      release: "release/coldplay-brothers-sisters",
      discNumber: 1,
      position: 3,
      externalId: "4eJNA83TrqZ3S6LSyK8rSf",
      externalLink: "https://open.spotify.com/track/4eJNA83TrqZ3S6LSyK8rSf",
    },
  ],
} as const satisfies Track
