import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeWarriors = {
  id: "01a0c43f-d195-74df-8f5d-98e30adb7433",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-warriors",
  ownLength: 2.834433333333333,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1lgN0A2Vki2FTON5PYq42m",
      externalLink: "https://open.spotify.com/track/1lgN0A2Vki2FTON5PYq42m",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Warriors",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "warriors|53XhwfbYqKCa1cC15pYq2q|170066",
  song: "song/imagine-dragons-warriors",
} as const satisfies Track
