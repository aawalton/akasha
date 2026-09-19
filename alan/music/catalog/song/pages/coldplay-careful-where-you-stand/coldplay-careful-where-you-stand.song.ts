import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayCarefulWhereYouStand = {
  id: "01a0ba5d-47bf-7e50-a5cb-9c73c6997a4d",
  type: "page-type/song",
  slug: "coldplay-careful-where-you-stand",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d78f4f5b-2d3f-4c4c-95a6-ff8f2dcf7374",
      externalLink: "https://musicbrainz.org/work/d78f4f5b-2d3f-4c4c-95a6-ff8f2dcf7374",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Careful Where You Stand",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
