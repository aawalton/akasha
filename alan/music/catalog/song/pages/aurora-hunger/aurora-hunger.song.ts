import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraHunger = {
  id: "019ea4a7-88df-7ef0-b7d5-83b4d3253232",
  type: "page-type/song",
  slug: "aurora-hunger",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "efa6d3c6-28ef-483c-9b17-f214e096fe24",
      externalLink: "https://musicbrainz.org/work/efa6d3c6-28ef-483c-9b17-f214e096fe24",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hunger",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
