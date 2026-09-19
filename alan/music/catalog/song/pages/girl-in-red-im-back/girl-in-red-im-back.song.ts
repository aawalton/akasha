import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedImBack = {
  id: "01a0b724-d5e2-719e-9557-2c9d0ea2d10e",
  type: "page-type/song",
  slug: "girl-in-red-im-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d4923e87-67af-4c69-8a55-e0a5727c4eb8",
      externalLink: "https://musicbrainz.org/work/d4923e87-67af-4c69-8a55-e0a5727c4eb8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’m Back",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
