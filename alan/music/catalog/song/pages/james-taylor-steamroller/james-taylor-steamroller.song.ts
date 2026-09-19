import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSteamroller = {
  id: "01a0b72f-473d-7875-b4a2-00327d7cd648",
  type: "page-type/song",
  slug: "james-taylor-steamroller",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "18cb8700-5235-33aa-b631-317a1736964c",
      externalLink: "https://musicbrainz.org/work/18cb8700-5235-33aa-b631-317a1736964c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Steamroller",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
