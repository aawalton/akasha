import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBirds = {
  id: "019ea497-23e3-72aa-8482-741380b63038",
  type: "page-type/song",
  slug: "imagine-dragons-birds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "24ea2aed-708a-49a3-a943-d7d4169f81f3",
      externalLink: "https://musicbrainz.org/work/24ea2aed-708a-49a3-a943-d7d4169f81f3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Birds",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
