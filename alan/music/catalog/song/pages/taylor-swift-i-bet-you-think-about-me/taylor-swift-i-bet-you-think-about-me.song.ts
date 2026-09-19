import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIBetYouThinkAboutMe = {
  id: "019ea416-1ce2-7073-ad7d-80f793adfdb9",
  type: "page-type/song",
  slug: "taylor-swift-i-bet-you-think-about-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "36b07648-8a4b-4963-b36f-bbfbcc822591",
      externalLink: "https://musicbrainz.org/work/36b07648-8a4b-4963-b36f-bbfbcc822591",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Bet You Think About Me",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
