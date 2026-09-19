import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsWaves = {
  id: "019ea49c-d386-7915-a499-05a98382822d",
  type: "page-type/song",
  slug: "imagine-dragons-waves",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d72623d2-9b2c-4e55-a9db-fab634906787",
      externalLink: "https://musicbrainz.org/work/d72623d2-9b2c-4e55-a9db-fab634906787",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Waves",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
