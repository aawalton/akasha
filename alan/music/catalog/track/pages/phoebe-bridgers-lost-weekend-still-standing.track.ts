import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersLostWeekendStillStanding = {
  id: "01a13fd9-71f7-77b2-b100-ea5013206c92",
  type: "page-type/track",
  slug: "phoebe-bridgers-lost-weekend-still-standing",
  ownLength: 3.93675,
  ownProgress: 0,
  partOfCollections: ["release/phoebe-bridgers-lost-weekend"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Still Standing",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "stillstanding|1r1uxoy19fzMxunt3ONAkG|236205",
  song: "song/phoebe-bridgers-still-standing",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-lost-weekend",
      discNumber: 1,
      position: 9,
      externalId: "09IT8imSuZBu1mjhNWHjuo",
      externalLink: "https://open.spotify.com/track/09IT8imSuZBu1mjhNWHjuo",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Track
