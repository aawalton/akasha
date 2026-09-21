import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsUnderdog = {
  id: "01a0c43f-d5c7-7791-9e7a-17f883e11341",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-underdog",
  ownLength: 3.4451,
  ownProgress: 3.4451,
  partOfCollections: ["release/imagine-dragons-night-visions"],
  position: 10,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0jjphpegPbJIk0C6BSvTE5",
      externalLink: "https://open.spotify.com/track/0jjphpegPbJIk0C6BSvTE5",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Underdog",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "underdog|53XhwfbYqKCa1cC15pYq2q|206706",
  song: "song/imagine-dragons-underdog",
} as const satisfies Track
