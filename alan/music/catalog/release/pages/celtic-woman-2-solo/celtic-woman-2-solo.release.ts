import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2Solo = {
  id: "01a0676a-d729-704d-b635-edd4d4139a19",
  type: "page-type/release",
  slug: "celtic-woman-2-solo",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2015-05-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5sawspceoFQ3Hp596Mo9ub",
      externalLink: "https://open.spotify.com/album/5sawspceoFQ3Hp596Mo9ub",
    },
  ],
  title: "Solo",
} as const satisfies Release
