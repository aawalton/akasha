import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayOceans = {
  id: "01a0ba5d-4be9-72af-acf9-476e0551dbac",
  type: "page-type/song",
  slug: "coldplay-oceans",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c83a98d-e7bc-42bf-9c86-e42cae9d2042",
      externalLink: "https://musicbrainz.org/work/0c83a98d-e7bc-42bf-9c86-e42cae9d2042",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oceans",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
