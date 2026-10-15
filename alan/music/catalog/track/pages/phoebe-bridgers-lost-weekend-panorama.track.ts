import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersLostWeekendPanorama = {
  id: "01a13fd9-71f7-7910-ba8b-26762f847ee7",
  type: "page-type/track",
  slug: "phoebe-bridgers-lost-weekend-panorama",
  ownLength: 2.7813666666666665,
  ownProgress: 0,
  partOfCollections: ["release/phoebe-bridgers-lost-weekend"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Panorama",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "panorama|1r1uxoy19fzMxunt3ONAkG|166882",
  song: "song/phoebe-bridgers-panorama",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-lost-weekend",
      discNumber: 1,
      position: 8,
      externalId: "696AN0lEtK19M7S7eX7A8y",
      externalLink: "https://open.spotify.com/track/696AN0lEtK19M7S7eX7A8y",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Track
