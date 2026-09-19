import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonDanceWithMe = {
  id: "019ea4ad-e863-7caa-9a05-8c5e485aeadd",
  type: "page-type/song",
  slug: "kelly-clarkson-dance-with-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "42ae0500-e18a-425b-8a72-c45f6aa3b650",
      externalLink: "https://musicbrainz.org/work/42ae0500-e18a-425b-8a72-c45f6aa3b650",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dance With Me",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
