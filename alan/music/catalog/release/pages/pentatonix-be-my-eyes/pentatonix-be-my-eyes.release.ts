import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixBeMyEyes = {
  id: "01a0676a-d718-701e-8b36-583a282b4fe7",
  type: "page-type/release",
  slug: "pentatonix-be-my-eyes",
  title: "Be My Eyes",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.4044333333333334,
  ownProgress: 3.404433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-10-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Sa0akcBToQpENN4FY6SzQ",
      externalLink: "https://open.spotify.com/album/6Sa0akcBToQpENN4FY6SzQ",
    },
  ],
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Release
