import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMoonRiver = {
  id: "01a0b72f-3924-7615-8372-12fdccc04ec4",
  type: "page-type/song",
  slug: "james-taylor-moon-river",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a3d9f3e-8697-4010-8a59-798cab00a232",
      externalLink: "https://musicbrainz.org/work/7a3d9f3e-8697-4010-8a59-798cab00a232",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Moon River",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
