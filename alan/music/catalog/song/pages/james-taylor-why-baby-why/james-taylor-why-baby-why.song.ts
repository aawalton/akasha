import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWhyBabyWhy = {
  id: "01a0b72f-4674-7dfa-9adb-a248d6eafe22",
  type: "page-type/song",
  slug: "james-taylor-why-baby-why",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0e3f8570-2b7e-416d-93f8-2d62e4bf647f",
      externalLink: "https://musicbrainz.org/work/0e3f8570-2b7e-416d-93f8-2d62e4bf647f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Why Baby Why",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
