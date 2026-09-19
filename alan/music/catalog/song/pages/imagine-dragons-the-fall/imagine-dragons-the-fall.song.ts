import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTheFall = {
  id: "019ea49c-f94b-760e-af0c-5c6340714fa4",
  type: "page-type/song",
  slug: "imagine-dragons-the-fall",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "daf62e81-d820-4be6-b0b4-869f60c0f197",
      externalLink: "https://musicbrainz.org/work/daf62e81-d820-4be6-b0b4-869f60c0f197",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Fall",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
