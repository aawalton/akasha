import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsBleedingOut = {
  id: "01a0c43f-d59e-7df6-b629-a9dea22e3125",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-bleeding-out",
  ownLength: 3.6842166666666665,
  ownProgress: 3.6842166666666665,
  partOfCollections: [
    "release/imagine-dragons-night-visions",
    "release/imagine-dragons-night-visions-deluxe",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Bleeding Out",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "bleedingout|53XhwfbYqKCa1cC15pYq2q|221053",
  song: "song/imagine-dragons-bleeding-out",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions",
      discNumber: 1,
      position: 9,
      externalId: "6NaBDHz9C7Uz9Z9CwLXQin",
      externalLink: "https://open.spotify.com/track/6NaBDHz9C7Uz9Z9CwLXQin",
    },
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "2auTfKFcoQd7z2uFCeuaww",
      externalLink: "https://open.spotify.com/track/2auTfKFcoQd7z2uFCeuaww",
    },
  ],
} as const satisfies Track
