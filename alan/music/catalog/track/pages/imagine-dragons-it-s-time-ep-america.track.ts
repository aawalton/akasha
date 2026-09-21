import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsItSTimeEpAmerica = {
  id: "01a0c43f-e54e-7f57-a9df-1286483d098d",
  type: "page-type/track",
  slug: "imagine-dragons-it-s-time-ep-america",
  ownLength: 4.557333333333333,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-it-s-time-ep"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hu7JllR9Dzbh06NIqi5FC",
      externalLink: "https://open.spotify.com/track/6hu7JllR9Dzbh06NIqi5FC",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "America",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "america|53XhwfbYqKCa1cC15pYq2q|273440",
  song: "song/imagine-dragons-america",
} as const satisfies Track
