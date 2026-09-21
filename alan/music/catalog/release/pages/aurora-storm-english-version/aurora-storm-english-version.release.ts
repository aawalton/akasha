import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraStormEnglishVersion = {
  id: "01a0676a-d72a-7024-a58d-95f7ac543f0a",
  type: "page-type/release",
  slug: "aurora-storm-english-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-06-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EAjWBnTZCl6QgQDNnPWLf",
      externalLink: "https://open.spotify.com/album/7EAjWBnTZCl6QgQDNnPWLf",
    },
  ],
  title: "Storm (English Version)",
} as const satisfies Release
