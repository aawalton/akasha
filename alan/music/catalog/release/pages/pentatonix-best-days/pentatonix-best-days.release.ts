import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixBestDays = {
  id: "01a0676a-d718-7041-bb55-aeffd138e4d2",
  type: "page-type/release",
  slug: "pentatonix-best-days",
  title: "Best Days",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.5767333333333333,
  ownProgress: 3.576733,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-01-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5YlPDNMn5nCCBaI3YroCZN",
      externalLink: "https://open.spotify.com/album/5YlPDNMn5nCCBaI3YroCZN",
    },
  ],
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Release
