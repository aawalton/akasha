import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeTiptoe = {
  id: "01a0c43f-d685-756c-9fd4-b6073c395b7d",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-tiptoe",
  ownLength: 3.216666666666667,
  ownProgress: 3.216666666666667,
  partOfCollections: ["release/imagine-dragons-night-visions-deluxe"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5PCdkbHYacEdWbZRRPopmM",
      externalLink: "https://open.spotify.com/track/5PCdkbHYacEdWbZRRPopmM",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Tiptoe",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "tiptoe|53XhwfbYqKCa1cC15pYq2q|193000",
  song: "song/imagine-dragons-tiptoe",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "5PCdkbHYacEdWbZRRPopmM",
      externalLink: "https://open.spotify.com/track/5PCdkbHYacEdWbZRRPopmM",
    },
  ],
} as const satisfies Track
