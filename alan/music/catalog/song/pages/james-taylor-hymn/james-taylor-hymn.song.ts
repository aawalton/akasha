import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHymn = {
  id: "01a0b72f-2237-7de2-9b6d-43928af65df5",
  type: "page-type/song",
  slug: "james-taylor-hymn",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2690ce9a-653e-4159-9b39-7dc61bcabac8",
      externalLink: "https://musicbrainz.org/work/2690ce9a-653e-4159-9b39-7dc61bcabac8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hymn",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
