import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyLoveAndTheLights = {
  id: "01a0d52b-52dc-782f-8c20-306c559823fc",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-love-and-the-lights",
  ownLength: 3.2925833333333334,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Love and the Lights",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "loveandthelights|1AFSUleuDTapVhm5zUf4ix|197555",
  song: "song/rockapella-love-and-the-lights",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 4,
      externalId: "5Z5bKUeGTHfpgcD4yNHAhC",
      externalLink: "https://open.spotify.com/track/5Z5bKUeGTHfpgcD4yNHAhC",
    },
  ],
} as const satisfies Track
