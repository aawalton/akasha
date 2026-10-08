import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaYourBodyTalk = {
  id: "019ea4ca-90aa-7b19-8a11-6fcb0388b608",
  type: "page-type/song",
  slug: "sia-your-body-talk",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0575a97f-8d14-47dc-bf31-110733851dba",
      externalLink: "https://musicbrainz.org/work/0575a97f-8d14-47dc-bf31-110733851dba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Your Body Talk",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:13:19.274Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
