import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWindowsFireAndRainMedley = {
  id: "01a0b72f-49a2-7f43-a246-56bbaa7baf56",
  type: "page-type/song",
  slug: "james-taylor-windows-fire-and-rain-medley",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2f07cc2c-263d-45d0-8581-61746a5a5a22",
      externalLink: "https://musicbrainz.org/work/2f07cc2c-263d-45d0-8581-61746a5a5a22",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Windows / Fire And Rain (Medley)",
  artist: "artist/james-taylor",
  performed: false,
  written: "collab",
} as const satisfies Song
