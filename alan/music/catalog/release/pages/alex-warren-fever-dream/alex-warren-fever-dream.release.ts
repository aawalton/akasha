import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenFeverDream = {
  id: "01a0a59d-ca7e-7077-8c2b-34c72563b8b1",
  type: "page-type/release",
  slug: "alex-warren-fever-dream",
  ownLength: 2.557166666666667,
  ownProgress: 0,
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  publishedAt: "2026-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1tJQ5Mp1XSf7waZzH6KhlJ",
      externalLink: "https://open.spotify.com/album/1tJQ5Mp1XSf7waZzH6KhlJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "FEVER DREAM",
} as const satisfies Release
