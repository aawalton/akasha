import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdPorcelain = {
  id: "019ea4df-2743-789c-98d3-addf1962ea20",
  type: "page-type/song",
  slug: "em-beihold-porcelain",
  title: "Porcelain",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6273edad-b8f3-4d0c-b85f-4a48d3ab5343",
      externalLink: "https://musicbrainz.org/work/6273edad-b8f3-4d0c-b85f-4a48d3ab5343",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
