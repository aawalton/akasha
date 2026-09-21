import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const chaislynRhymeOrReason = {
  id: "01a0676a-d728-7003-b5e7-3de3a725b9a2",
  type: "page-type/release",
  slug: "chaislyn-rhyme-or-reason",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/chaislyn"],
  position: 0,
  publishedAt: "2025-02-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5sVzWvkKeVITAFcpjs7HOl",
      externalLink: "https://open.spotify.com/album/5sVzWvkKeVITAFcpjs7HOl",
    },
  ],
  title: "rhyme or reason",
} as const satisfies Release
