import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeDaddy = {
  id: "01a0b9ee-cf7a-7077-b3d1-b62d03267f4f",
  type: "page-type/track",
  slug: "coldplay-everyday-life-daddy",
  ownLength: 4.972,
  ownProgress: 4.972,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Daddy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "daddy|4gzpq5DPGxSnKTe4SA8HAU|298320",
  song: "song/coldplay-daddy",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 1,
      position: 5,
      externalId: "3pcPPhPAiurm2Ior11SHrz",
      externalLink: "https://open.spotify.com/track/3pcPPhPAiurm2Ior11SHrz",
    },
  ],
} as const satisfies Track
