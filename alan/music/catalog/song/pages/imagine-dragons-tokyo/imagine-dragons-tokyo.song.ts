import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTokyo = {
  id: "019ea49c-ba49-79c1-8f35-8a37690aa3ea",
  type: "page-type/song",
  slug: "imagine-dragons-tokyo",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c7d97287-0c1f-4a6c-ad3a-cf6ea38a27d3",
      externalLink: "https://musicbrainz.org/work/c7d97287-0c1f-4a6c-ad3a-cf6ea38a27d3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tokyo",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
