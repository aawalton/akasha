import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLikeARiverRuns = {
  id: "019ea4c6-c413-7842-818a-922baa3fb42e",
  type: "page-type/song",
  slug: "sia-like-a-river-runs",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0a79c49c-6a20-4d5f-99bb-7fc123cb7d38",
      externalLink: "https://musicbrainz.org/work/0a79c49c-6a20-4d5f-99bb-7fc123cb7d38",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Like a River Runs",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
