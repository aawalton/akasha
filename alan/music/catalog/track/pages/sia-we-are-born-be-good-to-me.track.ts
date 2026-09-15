import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornBeGoodToMe = {
  id: "01a0a59c-0a60-7b3a-b043-714025f61dd7",
  type: "track",
  slug: "sia-we-are-born-be-good-to-me",
  ownLength: 3.9431,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Gv7poXKlQnLjUO8KtxBFF",
      externalLink: "https://open.spotify.com/track/1Gv7poXKlQnLjUO8KtxBFF",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Be Good To Me",
} as const satisfies Track
