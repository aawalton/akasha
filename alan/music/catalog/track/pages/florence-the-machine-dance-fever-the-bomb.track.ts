import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const florenceTheMachineDanceFeverTheBomb = {
  id: "01a0a5cd-5c49-777d-b461-764c43cad305",
  type: "track",
  slug: "florence-the-machine-dance-fever-the-bomb",
  ownLength: 2.742766666666667,
  ownProgress: 0,
  partOfCollections: ["release/florence-the-machine-dance-fever"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QAztdj5jtr41PL56WcgvP",
      externalLink: "https://open.spotify.com/track/6QAztdj5jtr41PL56WcgvP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Bomb",
} as const satisfies Track
