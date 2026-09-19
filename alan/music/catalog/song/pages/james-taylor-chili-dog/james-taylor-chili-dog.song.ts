import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorChiliDog = {
  id: "01a0b72f-2832-76ee-98dc-57d16dfe68e7",
  type: "page-type/song",
  slug: "james-taylor-chili-dog",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "82ae00af-f988-3f87-9392-2c78858d876b",
      externalLink: "https://musicbrainz.org/work/82ae00af-f988-3f87-9392-2c78858d876b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Chili Dog",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
