import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsEveryNight = {
  id: "019ea49a-9c8e-72c4-8379-80b0c00ff068",
  type: "page-type/song",
  slug: "imagine-dragons-every-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cb154679-7ca9-487e-9a39-4b7281071302",
      externalLink: "https://musicbrainz.org/work/cb154679-7ca9-487e-9a39-4b7281071302",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Every Night",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
