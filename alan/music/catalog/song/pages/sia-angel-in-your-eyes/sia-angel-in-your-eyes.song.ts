import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAngelInYourEyes = {
  id: "019ea4c4-2594-75a2-990c-837b4591c468",
  type: "page-type/song",
  slug: "sia-angel-in-your-eyes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "719ffe01-22cf-403a-99e1-bcd90aad0b40",
      externalLink: "https://musicbrainz.org/work/719ffe01-22cf-403a-99e1-bcd90aad0b40",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Angel in Your Eyes",
  artist: "artist/sia",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
