import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpen = {
  id: "01a0676a-d71d-705b-95bd-a17767768530",
  type: "page-type/release",
  slug: "sabrina-carpenter-eyes-wide-open",
  title: "Eyes Wide Open",
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  ownLength: 40.61795,
  ownProgress: 40.61795,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-04-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "55huyEjfSVsk9nnmmKp5df",
      externalLink: "https://open.spotify.com/album/55huyEjfSVsk9nnmmKp5df",
      lastSyncedAt: "2025-12-24",
    },
  ],
} as const satisfies Release
