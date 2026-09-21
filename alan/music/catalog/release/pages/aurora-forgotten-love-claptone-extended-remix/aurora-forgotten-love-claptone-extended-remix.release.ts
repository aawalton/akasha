import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraForgottenLoveClaptoneExtendedRemix = {
  id: "01a0676a-d71e-702e-896c-a1300a626c14",
  type: "page-type/release",
  slug: "aurora-forgotten-love-claptone-extended-remix",
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
      externalId: "1ECqWy3lEEZtOeuqwb0nLv",
      externalLink: "https://open.spotify.com/album/1ECqWy3lEEZtOeuqwb0nLv",
    },
  ],
  title: "Forgotten Love (Claptone Extended Remix)",
} as const satisfies Release
