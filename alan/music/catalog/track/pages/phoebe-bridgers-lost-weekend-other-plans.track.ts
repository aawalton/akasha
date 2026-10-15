import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersLostWeekendOtherPlans = {
  id: "01a13fd9-71f7-7556-adcb-753f88f7b6e1",
  type: "page-type/track",
  slug: "phoebe-bridgers-lost-weekend-other-plans",
  ownLength: 2.33335,
  ownProgress: 0,
  partOfCollections: ["release/phoebe-bridgers-lost-weekend"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Other Plans",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "otherplans|1r1uxoy19fzMxunt3ONAkG|140001",
  song: "song/phoebe-bridgers-other-plans",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-lost-weekend",
      discNumber: 1,
      position: 12,
      externalId: "2MAhy15YKrS4bvQnwhv0vM",
      externalLink: "https://open.spotify.com/track/2MAhy15YKrS4bvQnwhv0vM",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Track
