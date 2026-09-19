import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishMyFuture = {
  id: "019ea4aa-d53a-7f2a-9f3f-f3017019a99f",
  type: "page-type/song",
  slug: "billie-eilish-my-future",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a8581db9-4f02-4b03-96ac-10cf405f672c",
      externalLink: "https://musicbrainz.org/work/a8581db9-4f02-4b03-96ac-10cf405f672c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "my future",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
