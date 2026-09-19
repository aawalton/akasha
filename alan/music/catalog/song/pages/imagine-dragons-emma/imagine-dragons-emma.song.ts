import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsEmma = {
  id: "019ea49a-c015-70fe-936e-6bb0937ed584",
  type: "page-type/song",
  slug: "imagine-dragons-emma",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e18464d6-4012-43cf-b261-d8ce1ea4d0b3",
      externalLink: "https://musicbrainz.org/work/e18464d6-4012-43cf-b261-d8ce1ea4d0b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Emma",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
