import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTalk2 = {
  id: "01a0676a-d72c-7000-bb1c-2fa7fcb2323e",
  type: "page-type/release",
  slug: "coldplay-talk-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2005-12-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5PqZvEQFscV66LOl52oGBS",
      externalLink: "https://open.spotify.com/album/5PqZvEQFscV66LOl52oGBS",
    },
  ],
  title: "Talk",
} as const satisfies Release
