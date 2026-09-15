import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersKyoto = {
  id: "01a0676a-d722-704f-ae3b-0970f025eb0d",
  type: "page-type/release",
  slug: "phoebe-bridgers-kyoto",
  title: "Kyoto",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 6.743317,
  ownProgress: 6.743317,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-04-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7IgYjX0xQMqWEBwIjF8vjM",
      externalLink: "https://open.spotify.com/album/7IgYjX0xQMqWEBwIjF8vjM",
    },
  ],
} as const satisfies Release
