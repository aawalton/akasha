import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiIDonTSmoke = {
  id: "019f0ea8-0ce8-7014-8d30-e941174601a4",
  type: "page-type/song",
  slug: "mitski-i-don-t-smoke",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eb1c56e2-baed-4aaf-8325-58e75207f414",
      externalLink: "https://musicbrainz.org/work/eb1c56e2-baed-4aaf-8325-58e75207f414",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Smoke",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
