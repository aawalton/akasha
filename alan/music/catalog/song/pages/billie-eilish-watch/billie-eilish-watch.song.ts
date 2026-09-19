import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishWatch = {
  id: "019ea4a8-7fc4-707f-844f-7b4be3f23482",
  type: "page-type/song",
  slug: "billie-eilish-watch",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "18d11606-c11e-4910-a92a-464b640ed029",
      externalLink: "https://musicbrainz.org/work/18d11606-c11e-4910-a92a-464b640ed029",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "watch",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
