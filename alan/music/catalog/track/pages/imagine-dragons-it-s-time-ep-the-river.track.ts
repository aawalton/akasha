import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsItSTimeEpTheRiver = {
  id: "01a0c43f-e4a3-7aa1-b5e5-75f7749a6fd3",
  type: "page-type/track",
  slug: "imagine-dragons-it-s-time-ep-the-river",
  ownLength: 3.4171,
  ownProgress: 3.4171,
  partOfCollections: ["release/imagine-dragons-it-s-time-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "The River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "theriver|53XhwfbYqKCa1cC15pYq2q|205026",
  song: "song/imagine-dragons-the-river",
  carriedBy: [
    {
      release: "release/imagine-dragons-it-s-time-ep",
      discNumber: 1,
      position: 4,
      externalId: "41zwUx62ysDe6nwWBh0OgF",
      externalLink: "https://open.spotify.com/track/41zwUx62ysDe6nwWBh0OgF",
    },
  ],
} as const satisfies Track
