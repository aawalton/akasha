import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonLastChristmas = {
  id: "01a0ba7f-a874-71a7-a715-a389376fd77c",
  type: "page-type/song",
  slug: "kelly-clarkson-last-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8e438d29-bc0b-3cfe-8c47-17e14113a3c3",
      externalLink: "https://musicbrainz.org/work/8e438d29-bc0b-3cfe-8c47-17e14113a3c3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Last Christmas",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
