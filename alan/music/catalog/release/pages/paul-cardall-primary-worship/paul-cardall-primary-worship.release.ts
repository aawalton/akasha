import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallPrimaryWorship = {
  id: "01a0676a-d727-701c-8e64-f93ef7b74e7e",
  type: "page-type/release",
  slug: "paul-cardall-primary-worship",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2005-09-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5O2gDJ3JsWX854qnmnDzyS",
      externalLink: "https://open.spotify.com/album/5O2gDJ3JsWX854qnmnDzyS",
    },
  ],
  title: "Primary Worship",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
