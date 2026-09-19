import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonBeautifulDisaster = {
  id: "019ea4b1-1538-744b-b581-95b3f8dceede",
  type: "page-type/song",
  slug: "kelly-clarkson-beautiful-disaster",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f7fdb25b-a042-3560-b1a3-64696dd26b79",
      externalLink: "https://musicbrainz.org/work/f7fdb25b-a042-3560-b1a3-64696dd26b79",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beautiful Disaster",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
