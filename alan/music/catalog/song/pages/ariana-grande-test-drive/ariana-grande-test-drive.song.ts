import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTestDrive = {
  id: "019ea4e5-58f0-76c3-85f4-0c71dbec9921",
  type: "page-type/song",
  slug: "ariana-grande-test-drive",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "52e6be2c-3294-49ce-bbc1-6d4bdc8385c0",
      externalLink: "https://musicbrainz.org/work/52e6be2c-3294-49ce-bbc1-6d4bdc8385c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "test drive",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
