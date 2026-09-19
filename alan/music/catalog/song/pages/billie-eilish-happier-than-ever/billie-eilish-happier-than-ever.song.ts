import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishHappierThanEver = {
  id: "01a0b771-0fc1-74e7-87b3-11d1dba4e836",
  type: "page-type/song",
  slug: "billie-eilish-happier-than-ever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aab769d3-a157-427d-b6b0-ac8120efce4d",
      externalLink: "https://musicbrainz.org/work/aab769d3-a157-427d-b6b0-ac8120efce4d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Happier Than Ever",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
