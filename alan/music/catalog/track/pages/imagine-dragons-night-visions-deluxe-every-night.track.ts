import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeEveryNight = {
  id: "01a0c43f-d782-7011-8e9c-42d30811d6ec",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-every-night",
  ownLength: 3.592216666666667,
  ownProgress: 3.592216666666667,
  partOfCollections: [
    "release/imagine-dragons-night-visions-deluxe",
    "release/imagine-dragons-night-visions",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Every Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "everynight|53XhwfbYqKCa1cC15pYq2q|215533",
  song: "song/imagine-dragons-every-night",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions",
      discNumber: 1,
      position: 8,
      externalId: "3WQZfz5DLbO2vnJDWNxRBf",
      externalLink: "https://open.spotify.com/track/3WQZfz5DLbO2vnJDWNxRBf",
    },
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 8,
      externalId: "2ICyhgONt8SyBo9R8vIelt",
      externalLink: "https://open.spotify.com/track/2ICyhgONt8SyBo9R8vIelt",
    },
  ],
} as const satisfies Track
