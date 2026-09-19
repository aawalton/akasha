import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishTearMyselfApart = {
  id: "019ea4a8-8758-7600-ad44-99048ae68e3c",
  type: "page-type/song",
  slug: "billie-eilish-tear-myself-apart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1a27ada0-c7ec-48fa-9543-a72fd4fd2e9c",
      externalLink: "https://musicbrainz.org/work/1a27ada0-c7ec-48fa-9543-a72fd4fd2e9c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tear Myself Apart",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
