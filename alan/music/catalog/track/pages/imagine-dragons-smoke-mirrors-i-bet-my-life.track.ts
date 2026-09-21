import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsIBetMyLife = {
  id: "01a0c43f-d2d8-73e4-8d27-8031bee434bc",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-i-bet-my-life",
  ownLength: 3.2117666666666667,
  ownProgress: 0,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15DrrIod12Tc2IoMaHiwlQ",
      externalLink: "https://open.spotify.com/track/15DrrIod12Tc2IoMaHiwlQ",
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
} as const satisfies Track
