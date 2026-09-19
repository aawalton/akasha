import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeShutUp = {
  id: "019ea4e5-a81f-73f0-8df2-3e991ebde649",
  type: "page-type/song",
  slug: "ariana-grande-shut-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "660bb459-44f6-4757-aff2-c1d5bcb24098",
      externalLink: "https://musicbrainz.org/work/660bb459-44f6-4757-aff2-c1d5bcb24098",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "shut up",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
