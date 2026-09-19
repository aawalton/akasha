import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSmackwaterJack = {
  id: "01a0b72f-4915-7579-8cc0-17db875b8d22",
  type: "page-type/song",
  slug: "james-taylor-smackwater-jack",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "29e83cc3-eab0-32c1-a02d-2cd86a0cd6f1",
      externalLink: "https://musicbrainz.org/work/29e83cc3-eab0-32c1-a02d-2cd86a0cd6f1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Smackwater Jack",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
