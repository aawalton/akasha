import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsSymphony = {
  id: "019ea49c-12a1-747d-92fd-181fc1abf24e",
  type: "page-type/song",
  slug: "imagine-dragons-symphony",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4f45a75e-d5d2-4d9a-8022-5723e680c882",
      externalLink: "https://musicbrainz.org/work/4f45a75e-d5d2-4d9a-8022-5723e680c882",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Symphony",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
