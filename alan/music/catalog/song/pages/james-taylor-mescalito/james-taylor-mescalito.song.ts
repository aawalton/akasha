import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMescalito = {
  id: "01a0b72f-420c-72fd-918a-ebbd78fc3ebf",
  type: "page-type/song",
  slug: "james-taylor-mescalito",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cc3fb458-d46a-4c10-8ece-4dbe4cda1b18",
      externalLink: "https://musicbrainz.org/work/cc3fb458-d46a-4c10-8ece-4dbe4cda1b18",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mescalito",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
