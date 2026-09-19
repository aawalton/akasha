import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdFantasy = {
  id: "019ea4df-5835-79df-927b-d0df614232f6",
  type: "page-type/song",
  slug: "em-beihold-fantasy",
  title: "Fantasy",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ae64ef8f-d399-43af-8923-1bfb36e9d251",
      externalLink: "https://musicbrainz.org/work/ae64ef8f-d399-43af-8923-1bfb36e9d251",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
