import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaPuppiesAreForever = {
  id: "019ea4ce-43e3-76cb-ae3e-14c5ffb9d1ef",
  type: "page-type/song",
  slug: "sia-puppies-are-forever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dc4fc1ab-06e1-4d0c-88f7-e9b8d4ef2a0e",
      externalLink: "https://musicbrainz.org/work/dc4fc1ab-06e1-4d0c-88f7-e9b8d4ef2a0e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Puppies Are Forever",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
