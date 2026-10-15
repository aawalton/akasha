import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersPunisherMoonSong = {
  id: "01a13fd9-71f9-7870-9960-f98b2d5ab6c5",
  type: "page-type/track",
  slug: "phoebe-bridgers-punisher-moon-song",
  ownLength: 4.627933333333333,
  ownProgress: 4.627933333333333,
  partOfCollections: ["release/phoebe-bridgers-punisher"],
  status: "completed",
  unit: "unit/minutes",
  title: "Moon Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "moonsong|1r1uxoy19fzMxunt3ONAkG|277676",
  song: "song/phoebe-bridgers-moon-song",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-punisher",
      discNumber: 1,
      position: 7,
      externalId: "46RNrAkGsqWTDrv2ZPOAbx",
      externalLink: "https://open.spotify.com/track/46RNrAkGsqWTDrv2ZPOAbx",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T14:00:29.023Z",
} as const satisfies Track
