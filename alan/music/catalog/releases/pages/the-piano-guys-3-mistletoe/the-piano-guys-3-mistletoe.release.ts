import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const thePianoGuys3Mistletoe = {
  id: "01a0676a-d724-707a-b54b-de7cd5fc45ec",
  type: "release",
  slug: "the-piano-guys-3-mistletoe",
  title: "Mistletoe",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 4.781333,
  ownProgress: 4.781333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-12-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4tPB4mfJ6h6Pkvw33HLlA8",
      externalLink: "https://open.spotify.com/album/4tPB4mfJ6h6Pkvw33HLlA8",
    },
  ],
} as const satisfies Release
