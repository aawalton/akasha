import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeTheRiver = {
  id: "01a0c43f-d87f-723d-ac0b-391c035b7559",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-the-river",
  ownLength: 3.4004333333333334,
  ownProgress: 3.4004333333333334,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "The River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "theriver|53XhwfbYqKCa1cC15pYq2q|204026",
  song: "song/imagine-dragons-the-river",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 14,
      externalId: "6fFnFIlj8LEHy7991Znnud",
      externalLink: "https://open.spotify.com/track/6fFnFIlj8LEHy7991Znnud",
    },
  ],
} as const satisfies Track
