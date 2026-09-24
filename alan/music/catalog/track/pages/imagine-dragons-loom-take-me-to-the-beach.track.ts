import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomTakeMeToTheBeach = {
  id: "01a0c43f-b4c7-7481-a110-6d3bd63cfab7",
  type: "page-type/track",
  slug: "imagine-dragons-loom-take-me-to-the-beach",
  ownLength: 2.784666666666667,
  ownProgress: 2.784666666666667,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "Take Me to the Beach",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "takemetothebeach|53XhwfbYqKCa1cC15pYq2q|167080",
  song: "song/imagine-dragons-take-me-to-the-beach",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 4,
      externalId: "2Wop6FEmIstWTMeQb0TXcw",
      externalLink: "https://open.spotify.com/track/2Wop6FEmIstWTMeQb0TXcw",
    },
  ],
} as const satisfies Track
