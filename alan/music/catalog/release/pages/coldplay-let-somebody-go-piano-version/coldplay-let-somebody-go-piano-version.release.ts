import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayLetSomebodyGoPianoVersion = {
  id: "01a0676a-d723-7024-a7f4-03ca04634181",
  type: "page-type/release",
  slug: "coldplay-let-somebody-go-piano-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2022-03-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1mbwiDXEr8l6mK7o76dqyu",
      externalLink: "https://open.spotify.com/album/1mbwiDXEr8l6mK7o76dqyu",
    },
  ],
  title: "Let Somebody Go (Piano Version)",
} as const satisfies Release
