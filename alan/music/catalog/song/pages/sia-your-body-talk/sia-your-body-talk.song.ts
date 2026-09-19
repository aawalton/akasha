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
} as const satisfies Song
