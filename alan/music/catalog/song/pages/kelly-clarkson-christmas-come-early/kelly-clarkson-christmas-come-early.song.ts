import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonChristmasComeEarly = {
  id: "019ea4af-10fa-7f31-a20f-7856960ea643",
  type: "page-type/song",
  slug: "kelly-clarkson-christmas-come-early",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7f36793d-7e65-4960-a10a-ed0ce4c56099",
      externalLink: "https://musicbrainz.org/work/7f36793d-7e65-4960-a10a-ed0ce4c56099",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Come Early",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
