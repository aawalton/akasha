import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanThePartingGlass = {
  id: "01a0b720-131a-7b7d-a7e5-6ca1759a115b",
  type: "page-type/song",
  slug: "celtic-woman-the-parting-glass",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c046f587-3c06-366e-a025-c1122ba8867a",
      externalLink: "https://musicbrainz.org/work/c046f587-3c06-366e-a025-c1122ba8867a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Parting Glass",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
