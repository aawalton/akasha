import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorItsTooLate = {
  id: "01a0b72f-43a0-7dfc-b068-a80b9f090f96",
  type: "page-type/song",
  slug: "james-taylor-its-too-late",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e7503093-d689-316d-8064-512b5e8075d1",
      externalLink: "https://musicbrainz.org/work/e7503093-d689-316d-8064-512b5e8075d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Too Late",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
