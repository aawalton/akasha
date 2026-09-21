import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeIBetMyLife = {
  id: "01a0c43f-cfa4-73ed-bfce-fc90eca0a91a",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-i-bet-my-life",
  ownLength: 3.2117666666666667,
  ownProgress: 3.2117666666666667,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  position: 5,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CQXNBt6zv15L8zDITcxRB",
      externalLink: "https://open.spotify.com/track/1CQXNBt6zv15L8zDITcxRB",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "I Bet My Life",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "ibetmylife|53XhwfbYqKCa1cC15pYq2q|192706",
  song: "song/imagine-dragons-i-bet-my-life",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "1CQXNBt6zv15L8zDITcxRB",
      externalLink: "https://open.spotify.com/track/1CQXNBt6zv15L8zDITcxRB",
    },
  ],
} as const satisfies Track
