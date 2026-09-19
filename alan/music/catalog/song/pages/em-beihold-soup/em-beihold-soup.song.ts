import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdSoup = {
  id: "019ea4df-c90b-799e-afa4-989200b96705",
  type: "page-type/song",
  slug: "em-beihold-soup",
  title: "Soup!",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "da5f64da-b3a1-48fd-95dc-c0f41f5e187a",
      externalLink: "https://musicbrainz.org/work/da5f64da-b3a1-48fd-95dc-c0f41f5e187a",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
