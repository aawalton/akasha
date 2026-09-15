import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaADayWithoutRainOneByOne = {
  id: "01a0a5b0-1664-77ff-9c6b-405c33fd66e5",
  type: "track",
  slug: "enya-a-day-without-rain-one-by-one",
  ownLength: 3.9444333333333335,
  ownProgress: 0,
  partOfCollections: ["release/enya-a-day-without-rain"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ueOEwIxlCAivSC8ZrA5xW",
      externalLink: "https://open.spotify.com/track/1ueOEwIxlCAivSC8ZrA5xW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One by One",
} as const satisfies Track
