import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNotJustOnChristmas = {
  id: "019ea4e5-f619-7f70-86ea-3f16218cd071",
  type: "page-type/song",
  slug: "ariana-grande-not-just-on-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71fd777c-6bd7-4c9a-a8f0-8d589b89e861",
      externalLink: "https://musicbrainz.org/work/71fd777c-6bd7-4c9a-a8f0-8d589b89e861",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Not Just on Christmas",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
