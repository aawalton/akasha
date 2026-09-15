import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Ghost = {
  id: "01a0676a-d71e-7058-811c-d54bd4bcae1e",
  type: "page-type/release",
  slug: "the-piano-guys-3-ghost",
  title: "Ghost",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 10.58825,
  ownProgress: 10.58825,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-09-23",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pObMBlGG6QmOlA31UlP4N",
      externalLink: "https://open.spotify.com/album/1pObMBlGG6QmOlA31UlP4N",
    },
  ],
} as const satisfies Release
