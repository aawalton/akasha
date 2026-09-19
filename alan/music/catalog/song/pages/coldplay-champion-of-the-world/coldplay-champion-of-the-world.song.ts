import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayChampionOfTheWorld = {
  id: "01a0ba5d-4212-7154-a9ea-a91e4b042a0e",
  type: "page-type/song",
  slug: "coldplay-champion-of-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "92a39f74-c418-486e-8a27-99c376b97752",
      externalLink: "https://musicbrainz.org/work/92a39f74-c418-486e-8a27-99c376b97752",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Champion of the World",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
