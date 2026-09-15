import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const ellaHendersonMirrorMan = {
  id: "01a0676a-d724-7072-b6a4-7802976bfe29",
  type: "page-type/release",
  slug: "ella-henderson-mirror-man",
  title: "Mirror Man",
  partOfCollections: ["artist/ella-henderson"],
  position: 0,
  ownLength: 3.708083,
  ownProgress: 3.708083,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-12-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ITGqq0PqvdCjnaylLyqLS",
      externalLink: "https://open.spotify.com/album/4ITGqq0PqvdCjnaylLyqLS",
      lastSyncedAt: "2026-02-19",
    },
  ],
} as const satisfies Release
