import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungTBone = {
  id: "01a0abeb-40b2-7c07-b716-35fbf24a790f",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-t-bone",
  ownLength: 3.7944333333333335,
  ownProgress: 3.7944333333333335,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "T-Bone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "tbone|0vn7UBvSQECKJm2817Yf1P|227666",
  song: "song/james-taylor-t-bone",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 2,
      externalId: "1GaH6RseIkZEnYVFYIIyGn",
      externalLink: "https://open.spotify.com/track/1GaH6RseIkZEnYVFYIIyGn",
    },
  ],
} as const satisfies Track
