import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const evynneHollensNeedYouNow = {
  id: "019ea4cf-153e-761d-86d9-8a28ec8a4a04",
  type: "page-type/song",
  slug: "evynne-hollens-need-you-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4d27f39d-d8b5-3483-bb86-e14ae3ebb90c",
      externalLink: "https://musicbrainz.org/work/4d27f39d-d8b5-3483-bb86-e14ae3ebb90c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Need You Now",
  artist: "artist/evynne-hollens",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
