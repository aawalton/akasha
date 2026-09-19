import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHomeByAnotherWay = {
  id: "01a0b72f-25cc-76bf-9a0c-47055135dc85",
  type: "page-type/song",
  slug: "james-taylor-home-by-another-way",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "602037fe-f41a-4542-8bf0-83c347523b71",
      externalLink: "https://musicbrainz.org/work/602037fe-f41a-4542-8bf0-83c347523b71",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Home by Another Way",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
