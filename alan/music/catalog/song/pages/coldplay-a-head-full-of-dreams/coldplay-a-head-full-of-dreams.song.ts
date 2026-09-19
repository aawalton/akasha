import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAHeadFullOfDreams = {
  id: "01a0ba5d-493a-7843-8b73-ddd99bed7755",
  type: "page-type/song",
  slug: "coldplay-a-head-full-of-dreams",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e3e210a4-e77b-499b-bb1b-e90710bfe401",
      externalLink: "https://musicbrainz.org/work/e3e210a4-e77b-499b-bb1b-e90710bfe401",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Head Full of Dreams",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
