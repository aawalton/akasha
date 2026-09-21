import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraForgottenLoveClaptoneRemix = {
  id: "01a0676a-d71e-702f-ac3c-eff4b5877dfb",
  type: "page-type/release",
  slug: "aurora-forgotten-love-claptone-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2018-10-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fX9u6aMlTuyytivNH27DS",
      externalLink: "https://open.spotify.com/album/2fX9u6aMlTuyytivNH27DS",
    },
  ],
  title: "Forgotten Love (Claptone Remix)",
} as const satisfies Release
