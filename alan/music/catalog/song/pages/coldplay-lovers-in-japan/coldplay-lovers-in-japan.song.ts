import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLoversInJapan = {
  id: "01a0ba5d-4d80-76f3-8afc-9a077046e7aa",
  type: "page-type/song",
  slug: "coldplay-lovers-in-japan",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2925b8cb-06ac-36f5-bb40-8f2941b57271",
      externalLink: "https://musicbrainz.org/work/2925b8cb-06ac-36f5-bb40-8f2941b57271",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lovers in Japan",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
