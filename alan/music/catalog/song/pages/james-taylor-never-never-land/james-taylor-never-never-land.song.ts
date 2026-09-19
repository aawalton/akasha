import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNeverNeverLand = {
  id: "01a0b72f-3951-7750-a973-7fbd8acb57fd",
  type: "page-type/song",
  slug: "james-taylor-never-never-land",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7c03fea9-d585-367a-b98a-1ae9c72c9955",
      externalLink: "https://musicbrainz.org/work/7c03fea9-d585-367a-b98a-1ae9c72c9955",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Never Land",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
