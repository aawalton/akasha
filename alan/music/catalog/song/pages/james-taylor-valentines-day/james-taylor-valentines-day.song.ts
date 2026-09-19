import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorValentinesDay = {
  id: "01a0b72f-5676-77a5-8e14-0c10ab73aa00",
  type: "page-type/song",
  slug: "james-taylor-valentines-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ce9b306d-20b2-4678-931c-be95287b8263",
      externalLink: "https://musicbrainz.org/work/ce9b306d-20b2-4678-931c-be95287b8263",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Valentine's Day",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
