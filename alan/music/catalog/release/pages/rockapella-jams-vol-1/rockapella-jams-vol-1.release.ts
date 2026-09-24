import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaJamsVol1 = {
  id: "01a0676a-d722-701e-9def-928440f964b5",
  type: "page-type/release",
  slug: "rockapella-jams-vol-1",
  title: "Jams, Vol. 1",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-09-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2MM4JH15vBUPoCXNqlvl9J",
      externalLink: "https://open.spotify.com/album/2MM4JH15vBUPoCXNqlvl9J",
    },
  ],
} as const satisfies Release
