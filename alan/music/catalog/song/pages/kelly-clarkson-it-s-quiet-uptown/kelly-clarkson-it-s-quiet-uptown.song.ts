import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonItSQuietUptown = {
  id: "019ea4ad-33aa-7706-9100-81dad3c01e73",
  type: "page-type/song",
  slug: "kelly-clarkson-it-s-quiet-uptown",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1d41ebd5-d8c4-428f-b564-ad6d1313df0c",
      externalLink: "https://musicbrainz.org/work/1d41ebd5-d8c4-428f-b564-ad6d1313df0c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Quiet Uptown",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
