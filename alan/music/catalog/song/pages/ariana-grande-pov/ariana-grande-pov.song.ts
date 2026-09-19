import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePov = {
  id: "019ea4e8-5c85-75dd-942b-9346c40a1944",
  type: "page-type/song",
  slug: "ariana-grande-pov",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f5667373-b047-45d2-a300-b82cd0605550",
      externalLink: "https://musicbrainz.org/work/f5667373-b047-45d2-a300-b82cd0605550",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "pov",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
