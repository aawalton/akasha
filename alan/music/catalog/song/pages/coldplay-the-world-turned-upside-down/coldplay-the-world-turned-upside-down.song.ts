import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTheWorldTurnedUpsideDown = {
  id: "01a0ba5d-4f24-7800-a023-fa535a965030",
  type: "page-type/song",
  slug: "coldplay-the-world-turned-upside-down",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4c68cd40-0dbe-436a-b4f3-3dd4a48699f4",
      externalLink: "https://musicbrainz.org/work/4c68cd40-0dbe-436a-b4f3-3dd4a48699f4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The World Turned Upside Down",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
