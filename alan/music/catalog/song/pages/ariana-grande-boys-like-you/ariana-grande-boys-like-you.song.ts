import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBoysLikeYou = {
  id: "019ea4e2-b640-7e8d-97e4-b73ca295abda",
  type: "page-type/song",
  slug: "ariana-grande-boys-like-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3c54b64-94a9-4b82-90fa-1aa3b75364dd",
      externalLink: "https://musicbrainz.org/work/b3c54b64-94a9-4b82-90fa-1aa3b75364dd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Boys Like You",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
