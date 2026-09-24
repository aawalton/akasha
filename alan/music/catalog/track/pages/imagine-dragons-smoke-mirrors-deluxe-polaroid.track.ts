import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxePolaroid = {
  id: "01a0c43f-cfc9-7d06-8953-7153d4eb9450",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-polaroid",
  ownLength: 3.83355,
  ownProgress: 3.83355,
  partOfCollections: [
    "release/imagine-dragons-smoke-mirrors-deluxe",
    "release/imagine-dragons-smoke-mirrors",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Polaroid",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "polaroid|53XhwfbYqKCa1cC15pYq2q|230013",
  song: "song/imagine-dragons-polaroid",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 6,
      externalId: "7fvgzmfXxrdTcrL3xh2cBD",
      externalLink: "https://open.spotify.com/track/7fvgzmfXxrdTcrL3xh2cBD",
    },
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 6,
      externalId: "6Ng999MKVY9ikd8FtGaNnz",
      externalLink: "https://open.spotify.com/track/6Ng999MKVY9ikd8FtGaNnz",
    },
  ],
} as const satisfies Track
