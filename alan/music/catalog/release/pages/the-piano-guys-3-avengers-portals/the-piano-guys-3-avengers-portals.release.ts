import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3AvengersPortals = {
  id: "01a0676a-d717-7043-aac8-4096ac20bcba",
  type: "page-type/release",
  slug: "the-piano-guys-3-avengers-portals",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2019-11-08",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3XF9a3HI2K79TQsGtAjDPc",
      externalLink: "https://open.spotify.com/album/3XF9a3HI2K79TQsGtAjDPc",
    },
  ],
  title: "Avengers/Portals",
} as const satisfies Release
