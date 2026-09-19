import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarkson4Carats = {
  id: "019ea4ae-0523-7b49-9504-8e59103684a7",
  type: "page-type/song",
  slug: "kelly-clarkson-4-carats",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a9c7f86-3c73-433f-bda4-37a05b912e1d",
      externalLink: "https://musicbrainz.org/work/4a9c7f86-3c73-433f-bda4-37a05b912e1d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "4 Carats",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
