import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeREM = {
  id: "019ea4e6-a62e-7116-8409-d12880fe32f5",
  type: "page-type/song",
  slug: "ariana-grande-r-e-m",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9ce41b08-6c87-4776-9dc6-aa645ee7b8c8",
      externalLink: "https://musicbrainz.org/work/9ce41b08-6c87-4776-9dc6-aa645ee7b8c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "R.E.M",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
