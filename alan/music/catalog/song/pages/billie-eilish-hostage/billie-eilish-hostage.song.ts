import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishHostage = {
  id: "019ea4a9-7377-7013-93f4-7cec6a15d0a1",
  type: "page-type/song",
  slug: "billie-eilish-hostage",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4f699513-536a-402c-935b-b7b322e0ed62",
      externalLink: "https://musicbrainz.org/work/4f699513-536a-402c-935b-b7b322e0ed62",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "hostage",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
