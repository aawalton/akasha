import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsFerrisWheel = {
  id: "019ea498-71eb-75cc-adb3-ea7c2d241066",
  type: "page-type/song",
  slug: "imagine-dragons-ferris-wheel",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5acd14bd-dbf6-4d5f-adc0-0f78c18263c8",
      externalLink: "https://musicbrainz.org/work/5acd14bd-dbf6-4d5f-adc0-0f78c18263c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ferris Wheel",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
