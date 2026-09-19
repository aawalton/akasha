import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBye = {
  id: "019ea4e2-63fc-7d1c-8bc8-987ab9f3b729",
  type: "page-type/song",
  slug: "ariana-grande-bye",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "92f286f7-2d62-42c9-8256-ff7e842ed10a",
      externalLink: "https://musicbrainz.org/work/92f286f7-2d62-42c9-8256-ff7e842ed10a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "bye",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
