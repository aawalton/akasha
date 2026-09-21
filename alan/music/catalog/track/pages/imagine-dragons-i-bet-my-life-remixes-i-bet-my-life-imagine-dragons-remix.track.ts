import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsIBetMyLifeRemixesIBetMyLifeImagineDragonsRemix = {
  id: "01a0c43f-e18e-765f-a8fe-e0c2d23b3491",
  type: "page-type/track",
  slug: "imagine-dragons-i-bet-my-life-remixes-i-bet-my-life-imagine-dragons-remix",
  ownLength: 4.976,
  ownProgress: 4.976,
  partOfCollections: ["release/imagine-dragons-i-bet-my-life-remixes"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3QA6BNJ54CH5G2nS5OtpGq",
      externalLink: "https://open.spotify.com/track/3QA6BNJ54CH5G2nS5OtpGq",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "I Bet My Life - Imagine Dragons Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "ibetmylifeimaginedragonsremix|53XhwfbYqKCa1cC15pYq2q|298560",
  song: "song/imagine-dragons-i-bet-my-life",
  carriedBy: [
    {
      release: "release/imagine-dragons-i-bet-my-life-remixes",
      discNumber: 1,
      position: 4,
      externalId: "3QA6BNJ54CH5G2nS5OtpGq",
      externalLink: "https://open.spotify.com/track/3QA6BNJ54CH5G2nS5OtpGq",
    },
  ],
} as const satisfies Track
