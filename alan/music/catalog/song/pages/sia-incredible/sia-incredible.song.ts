import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIncredible = {
  id: "019ea4c9-b795-7575-b06b-06d2e6dd1bf1",
  type: "page-type/song",
  slug: "sia-incredible",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bcb1a0fc-8baa-4c22-b91f-5639627bb72e",
      externalLink: "https://musicbrainz.org/work/bcb1a0fc-8baa-4c22-b91f-5639627bb72e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Incredible",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
