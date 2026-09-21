import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsIBetMyLifeRemixesIBetMyLifeLostKingsRemix = {
  id: "01a0c43f-e165-77bd-b91e-7cfc672a367c",
  type: "page-type/track",
  slug: "imagine-dragons-i-bet-my-life-remixes-i-bet-my-life-lost-kings-remix",
  ownLength: 3.9788833333333335,
  ownProgress: 3.9788833333333335,
  partOfCollections: ["release/imagine-dragons-i-bet-my-life-remixes"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3byeoYtEiTC3wbrcslxYn3",
      externalLink: "https://open.spotify.com/track/3byeoYtEiTC3wbrcslxYn3",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "I Bet My Life - Lost Kings Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "ibetmylifelostkingsremix|53XhwfbYqKCa1cC15pYq2q|238733",
  song: "song/imagine-dragons-i-bet-my-life",
  carriedBy: [
    {
      release: "release/imagine-dragons-i-bet-my-life-remixes",
      discNumber: 1,
      position: 3,
      externalId: "3byeoYtEiTC3wbrcslxYn3",
      externalLink: "https://open.spotify.com/track/3byeoYtEiTC3wbrcslxYn3",
    },
  ],
} as const satisfies Track
