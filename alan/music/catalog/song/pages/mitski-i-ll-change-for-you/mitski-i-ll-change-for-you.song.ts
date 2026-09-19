import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiILlChangeForYou = {
  id: "019f0ea6-5e01-76b4-827f-86a85d8ffba0",
  type: "page-type/song",
  slug: "mitski-i-ll-change-for-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ca5b97d5-0921-443b-9ab8-9ca01124b685",
      externalLink: "https://musicbrainz.org/work/ca5b97d5-0921-443b-9ab8-9ca01124b685",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’ll Change for You",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
