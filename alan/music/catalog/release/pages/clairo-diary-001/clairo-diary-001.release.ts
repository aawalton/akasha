import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoDiary001 = {
  id: "01a0676a-d71c-7010-945e-77eea0cb0f4b",
  type: "page-type/release",
  slug: "clairo-diary-001",
  title: "diary 001",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 14.728083,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-05-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4LD79sp9RPrgjeVpmmtf3S",
      externalLink: "https://open.spotify.com/album/4LD79sp9RPrgjeVpmmtf3S",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-09-15T16:34:44.000Z",
} as const satisfies Release
