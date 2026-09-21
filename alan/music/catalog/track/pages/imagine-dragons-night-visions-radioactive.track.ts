import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsRadioactive = {
  id: "01a0c43f-d458-75b8-963a-4b9bbb0e31f5",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-radioactive",
  ownLength: 3.11355,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-night-visions"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4G8gkOterJn0Ywt6uhqbhp",
      externalLink: "https://open.spotify.com/track/4G8gkOterJn0Ywt6uhqbhp",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Radioactive",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "radioactive|53XhwfbYqKCa1cC15pYq2q|186813",
  song: "song/imagine-dragons-radioactive",
} as const satisfies Track
