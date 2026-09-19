import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorPromisedLand = {
  id: "01a0b72f-32be-7612-b80e-d8e5e86703fe",
  type: "page-type/song",
  slug: "james-taylor-promised-land",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0b45a782-6a30-38fb-9087-77ed40f92d60",
      externalLink: "https://musicbrainz.org/work/0b45a782-6a30-38fb-9087-77ed40f92d60",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Promised Land",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
