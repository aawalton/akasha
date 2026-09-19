import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTheUnknown = {
  id: "019ea49d-36d4-783d-bbd0-1ea225e559aa",
  type: "page-type/song",
  slug: "imagine-dragons-the-unknown",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f79bd167-f5af-4f3f-b273-456deaef9e69",
      externalLink: "https://musicbrainz.org/work/f79bd167-f5af-4f3f-b273-456deaef9e69",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Unknown",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
