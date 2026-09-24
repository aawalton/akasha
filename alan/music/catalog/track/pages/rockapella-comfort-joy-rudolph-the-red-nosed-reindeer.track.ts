import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyRudolphTheRedNosedReindeer = {
  id: "01a0d52b-52dc-70f3-864c-779ff15bc625",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-rudolph-the-red-nosed-reindeer",
  ownLength: 3.0418,
  ownProgress: 3.0418,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rudolph the Red-Nosed Reindeer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "rudolphtherednosedreindeer|1AFSUleuDTapVhm5zUf4ix|182508",
  song: "song/rockapella-rudolph-the-red-nosed-reindeer",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 2,
      externalId: "32lUXMEMjGU9qflwAEAJx4",
      externalLink: "https://open.spotify.com/track/32lUXMEMjGU9qflwAEAJx4",
    },
  ],
} as const satisfies Track
