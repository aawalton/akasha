import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaNataleSSong = {
  id: "019ea4c9-6a44-7806-a356-ea359bdf02e1",
  type: "page-type/song",
  slug: "sia-natale-s-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9d006c43-0ce7-4f87-b35c-0df870ccc950",
      externalLink: "https://musicbrainz.org/work/9d006c43-0ce7-4f87-b35c-0df870ccc950",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Natale’s Song",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
