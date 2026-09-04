import type { Song } from "../../song.page-type.ts"

export const siaNataleSSong = {
  id: "019ea4c9-6a44-7806-a356-ea359bdf02e1",
  pageTypeSlug: "song",
  slug: "sia-natale-s-song",
  title: "Natale’s Song",
  artistSlug: "sia",
  externalId: "9d006c43-0ce7-4f87-b35c-0df870ccc950",
  externalLink: "https://musicbrainz.org/work/9d006c43-0ce7-4f87-b35c-0df870ccc950",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
