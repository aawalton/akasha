import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const florenceTheMachineLungs = {
  id: "01a0676a-d724-7016-9a1f-4e7d4dc0f2be",
  type: "page-type/release",
  slug: "florence-the-machine-lungs",
  title: "Lungs",
  partOfCollections: ["artist/florence-the-machine"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2009-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2KAK58PimXHF4lSoKO3RxA",
      externalLink: "https://open.spotify.com/album/2KAK58PimXHF4lSoKO3RxA",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
