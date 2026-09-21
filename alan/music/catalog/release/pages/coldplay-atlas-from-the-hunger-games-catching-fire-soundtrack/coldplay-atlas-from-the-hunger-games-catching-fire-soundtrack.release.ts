import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayAtlasFromTheHungerGamesCatchingFireSoundtrack = {
  id: "01a0676a-d717-703b-950a-936b0738f6f2",
  type: "page-type/release",
  slug: "coldplay-atlas-from-the-hunger-games-catching-fire-soundtrack",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2013-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1aJ1PDNjC6ZzEu74BkmGE4",
      externalLink: "https://open.spotify.com/album/1aJ1PDNjC6ZzEu74BkmGE4",
    },
  ],
  title: "Atlas (From “The Hunger Games: Catching Fire” Soundtrack)",
} as const satisfies Release
