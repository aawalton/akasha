import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeThief = {
  id: "01a0c43f-d0f7-77f5-99ba-74958cab60a5",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-thief",
  ownLength: 3.79155,
  ownProgress: 3.79155,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Thief",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "thief|53XhwfbYqKCa1cC15pYq2q|227493",
  song: "song/imagine-dragons-thief",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 14,
      externalId: "2Q4OrJV7rGtUpPsLGbchgr",
      externalLink: "https://open.spotify.com/track/2Q4OrJV7rGtUpPsLGbchgr",
    },
  ],
} as const satisfies Track
