import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsHearMe = {
  id: "01a0c43f-d547-73bb-bc22-a7e08929d28a",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-hear-me",
  ownLength: 3.8706666666666667,
  ownProgress: 3.8706666666666667,
  partOfCollections: ["release/imagine-dragons-night-visions"],
  position: 7,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Agiwcd2KjBOG2MkckhC3i",
      externalLink: "https://open.spotify.com/track/3Agiwcd2KjBOG2MkckhC3i",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Hear Me",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "hearme|53XhwfbYqKCa1cC15pYq2q|232240",
  song: "song/imagine-dragons-hear-me",
} as const satisfies Track
