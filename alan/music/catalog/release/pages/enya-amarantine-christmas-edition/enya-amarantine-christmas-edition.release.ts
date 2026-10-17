import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaAmarantineChristmasEdition = {
  id: "01a0676a-d716-703a-83dd-3ab16b92535e",
  type: "page-type/release",
  slug: "enya-amarantine-christmas-edition",
  title: "Amarantine (Christmas Edition)",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-11-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6oDOsxO2DrqoPr3xqPA6hO",
      externalLink: "https://open.spotify.com/album/6oDOsxO2DrqoPr3xqPA6hO",
    },
  ],
  createdAt: "2026-09-03T13:17:30.262Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
