import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBurn = {
  id: "019ea4aa-dcf0-7131-8c1b-979e34d4b79b",
  type: "song",
  slug: "billie-eilish-burn",
  title: "&burn",
  artist: "artist/billie-eilish",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a8d7dd94-c737-4283-a549-9610fbf863ce",
      externalLink: "https://musicbrainz.org/work/a8d7dd94-c737-4283-a549-9610fbf863ce",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
