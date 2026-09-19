import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBreakFree = {
  id: "019ea4e1-f38c-7b25-9309-4f16395abde7",
  type: "page-type/song",
  slug: "ariana-grande-break-free",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "764c6278-a9f8-43f3-82cb-14bf65e57b21",
      externalLink: "https://musicbrainz.org/work/764c6278-a9f8-43f3-82cb-14bf65e57b21",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Break Free",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
