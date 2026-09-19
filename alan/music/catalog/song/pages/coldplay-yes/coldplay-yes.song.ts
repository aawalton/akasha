import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayYes = {
  id: "01a0ba61-0021-7866-847f-0d4e29322c93",
  type: "page-type/song",
  slug: "coldplay-yes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c662eefb-5a93-37f1-a750-0059cb0f1e79",
      externalLink: "https://musicbrainz.org/work/c662eefb-5a93-37f1-a750-0059cb0f1e79",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yes",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
