import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMigration = {
  id: "01a0b72f-332d-7ff8-942b-37b31c2e9238",
  type: "page-type/song",
  slug: "james-taylor-migration",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "20c8c5ed-5af9-4251-9409-9f1c4ea148ea",
      externalLink: "https://musicbrainz.org/work/20c8c5ed-5af9-4251-9409-9f1c4ea148ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Migration",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
