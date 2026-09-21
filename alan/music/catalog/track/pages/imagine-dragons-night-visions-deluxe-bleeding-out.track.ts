import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeBleedingOut = {
  id: "01a0c43f-d7ab-7873-9203-c7c010fa3d77",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-bleeding-out",
  ownLength: 3.6842166666666665,
  ownProgress: 3.6842166666666665,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 9,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2auTfKFcoQd7z2uFCeuaww",
      externalLink: "https://open.spotify.com/track/2auTfKFcoQd7z2uFCeuaww",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Bleeding Out",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "bleedingout|53XhwfbYqKCa1cC15pYq2q|221053",
  song: "song/imagine-dragons-bleeding-out",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "2auTfKFcoQd7z2uFCeuaww",
      externalLink: "https://open.spotify.com/track/2auTfKFcoQd7z2uFCeuaww",
    },
  ],
} as const satisfies Track
