import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMoonMusic = {
  id: "01a0ba60-f66e-7f27-8d14-079a89a06508",
  type: "page-type/song",
  slug: "coldplay-moon-music",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a8c689ca-cf15-4796-adde-118f1ad8b5e4",
      externalLink: "https://musicbrainz.org/work/a8c689ca-cf15-4796-adde-118f1ad8b5e4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "MOON MUSiC",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
