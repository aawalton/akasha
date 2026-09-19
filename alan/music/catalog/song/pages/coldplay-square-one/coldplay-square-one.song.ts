import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySquareOne = {
  id: "01a0ba5d-5247-7895-901b-2f9f0bed36cb",
  type: "page-type/song",
  slug: "coldplay-square-one",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5e650b17-bb44-3932-aa39-28e5d7798e84",
      externalLink: "https://musicbrainz.org/work/5e650b17-bb44-3932-aa39-28e5d7798e84",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Square One",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
