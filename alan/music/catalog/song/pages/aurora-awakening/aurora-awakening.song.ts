import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAwakening = {
  id: "019ea4a5-3944-7f04-b0b9-d8df08267814",
  type: "page-type/song",
  slug: "aurora-awakening",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "576b6d67-7c33-4de2-85e4-1ef562343cbe",
      externalLink: "https://musicbrainz.org/work/576b6d67-7c33-4de2-85e4-1ef562343cbe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Awakening",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:32:32.068Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
