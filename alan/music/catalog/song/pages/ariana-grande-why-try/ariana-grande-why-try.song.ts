import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWhyTry = {
  id: "019ea4e3-fe15-72c6-9954-f468f3907a11",
  type: "page-type/song",
  slug: "ariana-grande-why-try",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "034e9335-6c73-4d09-bb2d-fa0d1051a191",
      externalLink: "https://musicbrainz.org/work/034e9335-6c73-4d09-bb2d-fa0d1051a191",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Why Try",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
