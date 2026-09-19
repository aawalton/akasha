import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBillieBossaNova = {
  id: "019ea4ac-028c-72bb-bdc1-c5b5df94acd1",
  type: "page-type/song",
  slug: "billie-eilish-billie-bossa-nova",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e778d68e-3e92-4b99-8d9b-712db81153c8",
      externalLink: "https://musicbrainz.org/work/e778d68e-3e92-4b99-8d9b-712db81153c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Billie Bossa Nova",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
