import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiILoveMeAfterYou = {
  id: "019f0ea0-511b-7d7a-9369-38b764f27342",
  type: "page-type/song",
  slug: "mitski-i-love-me-after-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4e355d15-fb61-4a77-b5b1-7cf691cafda9",
      externalLink: "https://musicbrainz.org/work/4e355d15-fb61-4a77-b5b1-7cf691cafda9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Love Me After You",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
