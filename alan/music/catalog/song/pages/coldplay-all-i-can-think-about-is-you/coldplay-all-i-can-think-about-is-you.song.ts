import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAllICanThinkAboutIsYou = {
  id: "01a0ba5d-384c-764d-94d7-036049187f48",
  type: "page-type/song",
  slug: "coldplay-all-i-can-think-about-is-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "015686a1-bf32-4943-afe9-82037a152482",
      externalLink: "https://musicbrainz.org/work/015686a1-bf32-4943-afe9-82037a152482",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All I Can Think About Is You",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
