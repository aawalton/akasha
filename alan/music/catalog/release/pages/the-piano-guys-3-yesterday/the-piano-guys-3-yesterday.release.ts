import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Yesterday = {
  id: "01a0676a-d731-7051-9a11-5aac7bf70920",
  type: "page-type/release",
  slug: "the-piano-guys-3-yesterday",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2019-07-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Opqmwpp1496mkDJ3bsELB",
      externalLink: "https://open.spotify.com/album/3Opqmwpp1496mkDJ3bsELB",
    },
  ],
  title: "Yesterday",
} as const satisfies Release
