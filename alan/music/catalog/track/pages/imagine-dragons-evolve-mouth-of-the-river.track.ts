import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsEvolveMouthOfTheRiver = {
  id: "01a0c43f-cb1f-7168-9166-2e931e8aab0a",
  type: "page-type/track",
  slug: "imagine-dragons-evolve-mouth-of-the-river",
  ownLength: 3.6926666666666668,
  ownProgress: 3.6926666666666668,
  partOfCollections: ["release/imagine-dragons-evolve"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mouth Of The River",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "mouthoftheriver|53XhwfbYqKCa1cC15pYq2q|221560",
  song: "song/imagine-dragons-mouth-of-the-river",
  carriedBy: [
    {
      release: "release/imagine-dragons-evolve",
      discNumber: 1,
      position: 9,
      externalId: "1dekgAFF9uTCqLsklDaCWb",
      externalLink: "https://open.spotify.com/track/1dekgAFF9uTCqLsklDaCWb",
    },
  ],
} as const satisfies Track
