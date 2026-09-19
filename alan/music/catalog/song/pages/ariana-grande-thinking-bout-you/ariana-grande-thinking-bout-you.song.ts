import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeThinkingBoutYou = {
  id: "019ea4e7-50d4-793c-8e12-47757fcc556e",
  type: "page-type/song",
  slug: "ariana-grande-thinking-bout-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "be94a4a5-8cd2-4ca7-a036-dc5256a63343",
      externalLink: "https://musicbrainz.org/work/be94a4a5-8cd2-4ca7-a036-dc5256a63343",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thinking Bout You",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
