import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSantaBaby = {
  id: "01a0ba7f-c4bd-732d-85de-9d2645777c2e",
  type: "page-type/song",
  slug: "kelly-clarkson-santa-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a10d7ca4-2dea-3127-b84c-b15fdd24b026",
      externalLink: "https://musicbrainz.org/work/a10d7ca4-2dea-3127-b84c-b15fdd24b026",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa Baby",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
