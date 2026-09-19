import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsStuck = {
  id: "019ea49c-3c0c-735a-ab9f-0beba9cbf42c",
  type: "page-type/song",
  slug: "imagine-dragons-stuck",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6d704767-416f-4907-a2b5-fe0b7466369e",
      externalLink: "https://musicbrainz.org/work/6d704767-416f-4907-a2b5-fe0b7466369e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stuck",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
