import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGotHerOwn = {
  id: "019ea4e0-79b7-739b-8083-17811c62ad80",
  type: "page-type/song",
  slug: "ariana-grande-got-her-own",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0e41f8c6-7bcd-4f6d-a52f-077441613a1d",
      externalLink: "https://musicbrainz.org/work/0e41f8c6-7bcd-4f6d-a52f-077441613a1d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Got Her Own",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
