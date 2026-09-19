import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBurn = {
  id: "019ea4aa-dcf0-7131-8c1b-979e34d4b79b",
  type: "page-type/song",
  slug: "billie-eilish-burn",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a8d7dd94-c737-4283-a549-9610fbf863ce",
      externalLink: "https://musicbrainz.org/work/a8d7dd94-c737-4283-a549-9610fbf863ce",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "&burn",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
