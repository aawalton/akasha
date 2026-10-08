import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSureOfMyself = {
  id: "019ea4cb-0efe-7f07-88e2-fd66ba88c90a",
  type: "page-type/song",
  slug: "sia-sure-of-myself",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1cc8b61e-b590-4263-baf6-6ad35fb310bc",
      externalLink: "https://musicbrainz.org/work/1cc8b61e-b590-4263-baf6-6ad35fb310bc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sure Of Myself",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:13:51.614Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
