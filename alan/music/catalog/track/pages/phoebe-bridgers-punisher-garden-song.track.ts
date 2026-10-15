import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersPunisherGardenSong = {
  id: "01a13fd9-71f8-7ff4-976e-eb35d97673a5",
  type: "page-type/track",
  slug: "phoebe-bridgers-punisher-garden-song",
  ownLength: 3.66135,
  ownProgress: 3.66135,
  partOfCollections: ["release/phoebe-bridgers-punisher", "release/phoebe-bridgers-i-see-you"],
  status: "completed",
  unit: "unit/minutes",
  title: "Garden Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "gardensong|1r1uxoy19fzMxunt3ONAkG|219681",
  song: "song/phoebe-bridgers-garden-song",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-i-see-you",
      discNumber: 1,
      position: 3,
      externalId: "1bqiv06ia9fhsmDGuXeTWe",
      externalLink: "https://open.spotify.com/track/1bqiv06ia9fhsmDGuXeTWe",
    },
    {
      release: "release/phoebe-bridgers-punisher",
      discNumber: 1,
      position: 2,
      externalId: "5bIgzvxvlefRUCQK9JPocF",
      externalLink: "https://open.spotify.com/track/5bIgzvxvlefRUCQK9JPocF",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T14:00:29.023Z",
} as const satisfies Track
