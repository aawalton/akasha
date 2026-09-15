import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheRiverAskjellRemix = {
  id: "01a0676a-d72e-7001-8885-24bd627ba690",
  type: "page-type/release",
  slug: "aurora-the-river-askjell-remix",
  title: "The River (Askjell Remix)",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 7.097583,
  ownProgress: 7.097583,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-05-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4MUYZFRBTzDnA8ResJefwA",
      externalLink: "https://open.spotify.com/album/4MUYZFRBTzDnA8ResJefwA",
    },
  ],
} as const satisfies Release
