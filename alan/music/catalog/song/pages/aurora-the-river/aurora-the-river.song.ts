import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheRiver = {
  id: "019ea4a4-9d12-79f8-8af2-c03a4cc3704e",
  type: "page-type/song",
  slug: "aurora-the-river",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "495d41e1-4bbd-4571-bf81-42013d0e842e",
      externalLink: "https://musicbrainz.org/work/495d41e1-4bbd-4571-bf81-42013d0e842e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The River",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
