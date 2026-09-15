import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTalk2 = {
  id: "01a0676a-d72c-7000-bb1c-2fa7fcb2323e",
  type: "release",
  slug: "coldplay-talk-2",
  title: "Talk",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 13.964867,
  ownProgress: 13.964867,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2005-12-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5PqZvEQFscV66LOl52oGBS",
      externalLink: "https://open.spotify.com/album/5PqZvEQFscV66LOl52oGBS",
    },
  ],
} as const satisfies Release
