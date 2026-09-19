import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSantaCantYouHearMe = {
  id: "01a0ba7f-c328-7644-a574-ac18e5cac35d",
  type: "page-type/song",
  slug: "kelly-clarkson-santa-cant-you-hear-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "985cda6c-68f0-4e94-bcd4-ee5396cae3a1",
      externalLink: "https://musicbrainz.org/work/985cda6c-68f0-4e94-bcd4-ee5396cae3a1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa, Can’t You Hear Me",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
