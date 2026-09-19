import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeFakeSmile = {
  id: "019ea4e3-48ec-752e-ad89-67e75baf2523",
  type: "page-type/song",
  slug: "ariana-grande-fake-smile",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d3467912-987d-49a6-b76d-a9e395fe923b",
      externalLink: "https://musicbrainz.org/work/d3467912-987d-49a6-b76d-a9e395fe923b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "fake smile",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
