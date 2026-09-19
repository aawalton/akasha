import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHateThatIMadeYouLoveMe = {
  id: "019ea4e0-5de3-7e08-9707-e2dfd4ef8920",
  type: "page-type/song",
  slug: "ariana-grande-hate-that-i-made-you-love-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a5275fb-630a-44ed-9346-5e64ac1f830a",
      externalLink: "https://musicbrainz.org/work/0a5275fb-630a-44ed-9346-5e64ac1f830a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "hate that i made you love me",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
