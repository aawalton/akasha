import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxBearsWolves = {
  id: "019ea4f5-52c1-7082-a9e2-123eb8b483d9",
  type: "page-type/song",
  slug: "lilith-max-bears-wolves",
  title: "Bears & Wolves",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71824307-8169-4fd5-b567-f85ec512f6dc",
      externalLink: "https://musicbrainz.org/recording/71824307-8169-4fd5-b567-f85ec512f6dc",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
