import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterNonsenseSpedUpVersion = {
  id: "01a0676a-d725-7076-ad2c-2f64ab2b2580",
  type: "page-type/release",
  slug: "sabrina-carpenter-nonsense-sped-up-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2022-11-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "23eBqMqUmcb1wcxuXfYw6k",
      externalLink: "https://open.spotify.com/album/23eBqMqUmcb1wcxuXfYw6k",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Nonsense (Sped Up Version)",
} as const satisfies Release
