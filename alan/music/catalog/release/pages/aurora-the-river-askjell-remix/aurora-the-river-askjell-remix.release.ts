import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheRiverAskjellRemix = {
  id: "01a0676a-d72e-7001-8885-24bd627ba690",
  type: "page-type/release",
  slug: "aurora-the-river-askjell-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2019-05-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4MUYZFRBTzDnA8ResJefwA",
      externalLink: "https://open.spotify.com/album/4MUYZFRBTzDnA8ResJefwA",
    },
  ],
  title: "The River (Askjell Remix)",
} as const satisfies Release
