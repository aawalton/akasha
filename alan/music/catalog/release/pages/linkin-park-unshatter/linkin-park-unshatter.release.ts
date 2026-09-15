import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkUnshatter = {
  id: "01a0676a-d72f-7047-9da7-cbbce7b85e27",
  type: "page-type/release",
  slug: "linkin-park-unshatter",
  title: "Unshatter",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 6.32225,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-04-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "56zX5d4lPMLS5dkjLXpOd7",
      externalLink: "https://open.spotify.com/album/56zX5d4lPMLS5dkjLXpOd7",
    },
  ],
} as const satisfies Release
