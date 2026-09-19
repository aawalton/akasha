import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonAMomentLikeThis = {
  id: "019ea4ad-1289-7e54-9880-93288d8bf355",
  type: "page-type/song",
  slug: "kelly-clarkson-a-moment-like-this",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "23979bac-dae0-4f95-b74c-fa62464f353b",
      externalLink: "https://musicbrainz.org/work/23979bac-dae0-4f95-b74c-fa62464f353b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Moment Like This",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
