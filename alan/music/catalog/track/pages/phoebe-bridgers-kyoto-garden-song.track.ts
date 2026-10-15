import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersKyotoGardenSong = {
  id: "01a13fd9-71f6-7fdf-adbc-b3929f7fba0b",
  type: "page-type/track",
  slug: "phoebe-bridgers-kyoto-garden-song",
  ownLength: 3.66775,
  ownProgress: 3.66775,
  partOfCollections: ["release/phoebe-bridgers-kyoto", "release/phoebe-bridgers-garden-song"],
  status: "completed",
  unit: "unit/minutes",
  title: "Garden Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "gardensong|1r1uxoy19fzMxunt3ONAkG|220065",
  song: "song/phoebe-bridgers-garden-song",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-garden-song",
      discNumber: 1,
      position: 1,
      externalId: "6WrzIVwfETihmZ91wwt5cq",
      externalLink: "https://open.spotify.com/track/6WrzIVwfETihmZ91wwt5cq",
    },
    {
      release: "release/phoebe-bridgers-kyoto",
      discNumber: 1,
      position: 2,
      externalId: "41AsqUFKLX6tU3tobtWeaS",
      externalLink: "https://open.spotify.com/track/41AsqUFKLX6tU3tobtWeaS",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T14:00:29.023Z",
} as const satisfies Track
