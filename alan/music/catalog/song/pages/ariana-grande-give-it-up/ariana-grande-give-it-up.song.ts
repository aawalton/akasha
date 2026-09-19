import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGiveItUp = {
  id: "019ea4e1-4562-7411-a4a2-e7e42f9bb479",
  type: "page-type/song",
  slug: "ariana-grande-give-it-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4bd3990e-3b88-4e88-8d8b-9e770fc2e1d2",
      externalLink: "https://musicbrainz.org/work/4bd3990e-3b88-4e88-8d8b-9e770fc2e1d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Give It Up",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
