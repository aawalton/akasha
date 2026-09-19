import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiComeIntoTheWater = {
  id: "019f0ea5-271c-7db6-9ce2-71b772ea2cd5",
  type: "page-type/song",
  slug: "mitski-come-into-the-water",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b1f83feb-5404-4f93-a8ca-6bef3dc7e64d",
      externalLink: "https://musicbrainz.org/work/b1f83feb-5404-4f93-a8ca-6bef3dc7e64d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Come Into the Water",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
