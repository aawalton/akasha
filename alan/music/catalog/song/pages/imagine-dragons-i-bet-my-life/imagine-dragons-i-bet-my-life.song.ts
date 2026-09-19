import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIBetMyLife = {
  id: "019ea498-27de-7941-9d55-281edda386b9",
  type: "page-type/song",
  slug: "imagine-dragons-i-bet-my-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "503c117e-4b20-4b6e-8ccb-da7e4eeae8b6",
      externalLink: "https://musicbrainz.org/work/503c117e-4b20-4b6e-8ccb-da7e4eeae8b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Bet My Life",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
