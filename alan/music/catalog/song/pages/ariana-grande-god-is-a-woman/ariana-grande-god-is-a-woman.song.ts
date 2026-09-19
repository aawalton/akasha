import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGodIsAWoman = {
  id: "019ea4e2-ce02-730a-bc9e-196c9202b522",
  type: "page-type/song",
  slug: "ariana-grande-god-is-a-woman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b7f117d7-5e23-4c96-bdf7-7890ecd93d89",
      externalLink: "https://musicbrainz.org/work/b7f117d7-5e23-4c96-bdf7-7890ecd93d89",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "God is a woman",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
