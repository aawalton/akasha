import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsFear = {
  id: "019ea499-4bba-7ace-ba5d-1a1add0f52a1",
  type: "page-type/song",
  slug: "imagine-dragons-fear",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "81428c16-7980-4c26-8d36-38be1af0b67e",
      externalLink: "https://musicbrainz.org/work/81428c16-7980-4c26-8d36-38be1af0b67e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fear",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
