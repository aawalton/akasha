import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersLostWeekendBobby = {
  id: "01a13fd9-71f6-7e58-aa87-c7cb9d6fcd22",
  type: "page-type/track",
  slug: "phoebe-bridgers-lost-weekend-bobby",
  ownLength: 3.98345,
  ownProgress: 0,
  partOfCollections: ["release/phoebe-bridgers-lost-weekend"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bobby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "bobby|1r1uxoy19fzMxunt3ONAkG|239007",
  song: "song/phoebe-bridgers-bobby",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-lost-weekend",
      discNumber: 1,
      position: 5,
      externalId: "6TSHGfV9E66qCNu4UP6xZu",
      externalLink: "https://open.spotify.com/track/6TSHGfV9E66qCNu4UP6xZu",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Track
