import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayTheScientistTheScientist = {
  id: "01a0b9ef-0217-735b-bbe9-a2919e1e6f88",
  type: "page-type/track",
  slug: "coldplay-the-scientist-the-scientist",
  ownLength: 5.190433333333333,
  ownProgress: 5.190433333333333,
  partOfCollections: ["release/coldplay-the-scientist"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Scientist",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "thescientist|4gzpq5DPGxSnKTe4SA8HAU|311426",
  song: "song/coldplay-the-scientist",
  carriedBy: [
    {
      release: "release/coldplay-the-scientist",
      discNumber: 1,
      position: 1,
      externalId: "2LTl1pU074hnzAdy0SpHAb",
      externalLink: "https://open.spotify.com/track/2LTl1pU074hnzAdy0SpHAb",
    },
  ],
} as const satisfies Track
