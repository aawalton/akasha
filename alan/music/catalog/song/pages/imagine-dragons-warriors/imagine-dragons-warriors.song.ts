import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsWarriors = {
  id: "019ea49b-e725-741b-abd1-083c82c10129",
  type: "page-type/song",
  slug: "imagine-dragons-warriors",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "406a7aac-497a-49a0-9e63-7d86755638b1",
      externalLink: "https://musicbrainz.org/work/406a7aac-497a-49a0-9e63-7d86755638b1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Warriors",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
