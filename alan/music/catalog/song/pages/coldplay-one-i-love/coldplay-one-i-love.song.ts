import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayOneILove = {
  id: "01a0ba5d-5014-771a-a10c-26f60bfc3a0e",
  type: "page-type/song",
  slug: "coldplay-one-i-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "51330850-913b-4f68-bb10-63ec543f030d",
      externalLink: "https://musicbrainz.org/work/51330850-913b-4f68-bb10-63ec543f030d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One I Love",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
