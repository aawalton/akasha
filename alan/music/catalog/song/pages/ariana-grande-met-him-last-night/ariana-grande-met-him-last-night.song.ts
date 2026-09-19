import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMetHimLastNight = {
  id: "019ea4e5-6354-7b28-8328-73658485dbe4",
  type: "page-type/song",
  slug: "ariana-grande-met-him-last-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5c47c2ed-41cf-4ee6-af5c-f819aa6fa2ad",
      externalLink: "https://musicbrainz.org/work/5c47c2ed-41cf-4ee6-af5c-f819aa6fa2ad",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Met Him Last Night",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
