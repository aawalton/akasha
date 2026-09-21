import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterNonsenseRemix = {
  id: "01a0676a-d725-7075-8139-66440fc94aa8",
  type: "page-type/release",
  slug: "sabrina-carpenter-nonsense-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2023-03-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1jTN0ud3pW7ATr45S1CdpL",
      externalLink: "https://open.spotify.com/album/1jTN0ud3pW7ATr45S1CdpL",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Nonsense (Remix)",
} as const satisfies Release
