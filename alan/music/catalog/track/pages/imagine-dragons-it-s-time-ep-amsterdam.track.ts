import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsItSTimeEpAmsterdam = {
  id: "01a0c43f-e451-7694-a81e-fe4f810660ef",
  type: "page-type/track",
  slug: "imagine-dragons-it-s-time-ep-amsterdam",
  ownLength: 4.084216666666666,
  ownProgress: 4.084216666666666,
  partOfCollections: ["release/imagine-dragons-it-s-time-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Amsterdam",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "amsterdam|53XhwfbYqKCa1cC15pYq2q|245053",
  song: "song/imagine-dragons-amsterdam",
  carriedBy: [
    {
      release: "release/imagine-dragons-it-s-time-ep",
      discNumber: 1,
      position: 2,
      externalId: "1bWB2ghKfcXTUGV7wy3ukQ",
      externalLink: "https://open.spotify.com/track/1bWB2ghKfcXTUGV7wy3ukQ",
    },
  ],
} as const satisfies Track
