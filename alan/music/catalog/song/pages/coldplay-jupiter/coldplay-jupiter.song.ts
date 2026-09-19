import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayJupiter = {
  id: "01a0ba60-f767-7bee-9cea-2fe11b5c1d0c",
  type: "page-type/song",
  slug: "coldplay-jupiter",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ad489773-3420-43fa-8047-dd44e9bb6158",
      externalLink: "https://musicbrainz.org/work/ad489773-3420-43fa-8047-dd44e9bb6158",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "JUPiTER",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
