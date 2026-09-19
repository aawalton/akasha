import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonAllIEverWanted = {
  id: "019ea4b0-90b4-71a3-a333-6951673bf2b0",
  type: "page-type/song",
  slug: "kelly-clarkson-all-i-ever-wanted",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d73b6aa0-c58f-379f-932b-8e9c247e5bbc",
      externalLink: "https://musicbrainz.org/work/d73b6aa0-c58f-379f-932b-8e9c247e5bbc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All I Ever Wanted",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
