import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLABoyz = {
  id: "019ea4e1-6ad7-7b11-bf6e-ada7c2e082ca",
  type: "page-type/song",
  slug: "ariana-grande-l-a-boyz",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5a826084-fdb6-4de6-907e-6ef379f049ec",
      externalLink: "https://musicbrainz.org/work/5a826084-fdb6-4de6-907e-6ef379f049ec",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "L.A. Boyz",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
