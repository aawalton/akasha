import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDaddy = {
  id: "01a0ba5d-3d36-7d3a-b970-485cc0025a20",
  type: "page-type/song",
  slug: "coldplay-daddy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "50ebf58b-d7bb-43d7-9756-0fb83fcfbce0",
      externalLink: "https://musicbrainz.org/work/50ebf58b-d7bb-43d7-9756-0fb83fcfbce0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daddy",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
