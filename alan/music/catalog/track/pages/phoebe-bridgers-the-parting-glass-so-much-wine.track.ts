import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersThePartingGlassSoMuchWine = {
  id: "01a13fd9-71fb-788f-b7fd-04f37bdf11aa",
  type: "page-type/track",
  slug: "phoebe-bridgers-the-parting-glass-so-much-wine",
  ownLength: 4.06,
  ownProgress: 0,
  partOfCollections: [
    "release/phoebe-bridgers-the-parting-glass",
    "release/phoebe-bridgers-so-much-wine",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "So Much Wine",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "somuchwine|1r1uxoy19fzMxunt3ONAkG|243600",
  song: "song/phoebe-bridgers-so-much-wine",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-so-much-wine",
      discNumber: 1,
      position: 1,
      externalId: "4ZPNGLtydYARKP681L3TAF",
      externalLink: "https://open.spotify.com/track/4ZPNGLtydYARKP681L3TAF",
    },
    {
      release: "release/phoebe-bridgers-the-parting-glass",
      discNumber: 1,
      position: 2,
      externalId: "1JuzAhwnyk10YCVORdWabv",
      externalLink: "https://open.spotify.com/track/1JuzAhwnyk10YCVORdWabv",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Track
