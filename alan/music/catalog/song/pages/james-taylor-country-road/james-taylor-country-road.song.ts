import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCountryRoad = {
  id: "01a0b72f-28ac-70a7-9347-e389eed0cdca",
  type: "page-type/song",
  slug: "james-taylor-country-road",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "86780a21-2c2c-395a-97a7-5fe5dbc60a3c",
      externalLink: "https://musicbrainz.org/work/86780a21-2c2c-395a-97a7-5fe5dbc60a3c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Country Road",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
