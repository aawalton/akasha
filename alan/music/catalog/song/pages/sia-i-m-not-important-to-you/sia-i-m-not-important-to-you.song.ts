import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIMNotImportantToYou = {
  id: "019ea4ca-60b6-71a8-a9d8-78772a753167",
  type: "page-type/song",
  slug: "sia-i-m-not-important-to-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f8121fd5-328e-444b-b142-1852885f32c7",
      externalLink: "https://musicbrainz.org/work/f8121fd5-328e-444b-b142-1852885f32c7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m Not Important to You",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
