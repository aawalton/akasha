import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeThankGoodness = {
  id: "019ea4e5-e35b-790a-aaae-945ad7343f06",
  type: "page-type/song",
  slug: "ariana-grande-thank-goodness",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6fa3f776-469c-4975-b9b8-48f6a7fdf998",
      externalLink: "https://musicbrainz.org/work/6fa3f776-469c-4975-b9b8-48f6a7fdf998",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thank Goodness",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
