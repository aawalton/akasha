import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackCommentary = {
  id: "01a0676a-d731-701b-8ecd-33790bac2fe6",
  type: "page-type/release",
  slug: "ariana-grande-wicked-the-soundtrack-commentary",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-12-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3SKe78ljCWiaGA2znAmGEs",
      externalLink: "https://open.spotify.com/album/3SKe78ljCWiaGA2znAmGEs",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Wicked: The Soundtrack (Commentary)",
} as const satisfies Release
