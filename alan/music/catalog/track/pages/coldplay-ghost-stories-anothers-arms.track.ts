import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayGhostStoriesAnothersArms = {
  id: "01a0b9ee-d8da-7545-adfc-51d37f67f2f6",
  type: "page-type/track",
  slug: "coldplay-ghost-stories-anothers-arms",
  ownLength: 3.9068833333333335,
  ownProgress: 3.9068833333333335,
  partOfCollections: ["release/coldplay-ghost-stories"],
  status: "completed",
  unit: "unit/minutes",
  title: "Another's Arms",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "anothersarms|4gzpq5DPGxSnKTe4SA8HAU|234413",
  song: "song/coldplay-anothers-arms",
  carriedBy: [
    {
      release: "release/coldplay-ghost-stories",
      discNumber: 1,
      position: 6,
      externalId: "22uzF19LxQW87kOVkR79Fq",
      externalLink: "https://open.spotify.com/track/22uzF19LxQW87kOVkR79Fq",
    },
  ],
} as const satisfies Track
