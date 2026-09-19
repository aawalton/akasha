import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayGreenEyes = {
  id: "01a0ba5d-4a10-7d86-9b3a-d0e731bb6d18",
  type: "page-type/song",
  slug: "coldplay-green-eyes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f27325a0-37c5-3699-8b71-4d30943ef3c7",
      externalLink: "https://musicbrainz.org/work/f27325a0-37c5-3699-8b71-4d30943ef3c7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Green Eyes",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
