import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAlmostLikeBeingInLove = {
  id: "01a0b72f-26ac-72ec-bd44-ad10bcbc9c3c",
  type: "page-type/song",
  slug: "james-taylor-almost-like-being-in-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a3dc627-859e-3800-809d-c18c4622031e",
      externalLink: "https://musicbrainz.org/work/6a3dc627-859e-3800-809d-c18c4622031e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Almost Like Being in Love",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
