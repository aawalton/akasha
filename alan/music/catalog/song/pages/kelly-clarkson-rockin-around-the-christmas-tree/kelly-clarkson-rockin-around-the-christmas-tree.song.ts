import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonRockinAroundTheChristmasTree = {
  id: "019ea4b1-7ad9-75d3-a0e1-4e4f5e57cf50",
  type: "page-type/song",
  slug: "kelly-clarkson-rockin-around-the-christmas-tree",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "15875086-77a1-3e37-b125-75252d9d6bef",
      externalLink: "https://musicbrainz.org/work/15875086-77a1-3e37-b125-75252d9d6bef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rockin’ Around the Christmas Tree",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
