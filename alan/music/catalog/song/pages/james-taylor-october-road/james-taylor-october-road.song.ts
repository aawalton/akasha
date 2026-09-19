import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOctoberRoad = {
  id: "01a0b72f-3a9a-7d60-a4ff-1ba250124540",
  type: "page-type/song",
  slug: "james-taylor-october-road",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8fb1bf06-f091-4da6-a817-49d97d0480a1",
      externalLink: "https://musicbrainz.org/work/8fb1bf06-f091-4da6-a817-49d97d0480a1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "October Road",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
