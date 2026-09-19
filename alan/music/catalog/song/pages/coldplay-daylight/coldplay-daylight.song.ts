import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDaylight = {
  id: "01a0ba5d-4282-71b7-835d-01742e94ce8f",
  type: "page-type/song",
  slug: "coldplay-daylight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "95db6a41-8aa6-3509-b531-d6195cb80689",
      externalLink: "https://musicbrainz.org/work/95db6a41-8aa6-3509-b531-d6195cb80689",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daylight",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
