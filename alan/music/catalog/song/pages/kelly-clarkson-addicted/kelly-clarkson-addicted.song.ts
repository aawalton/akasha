import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonAddicted = {
  id: "019ea4b0-b44d-773c-be50-8de4f0bfdf0f",
  type: "page-type/song",
  slug: "kelly-clarkson-addicted",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dc238800-3b08-3ffe-a00f-6f6e50229225",
      externalLink: "https://musicbrainz.org/work/dc238800-3b08-3ffe-a00f-6f6e50229225",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Addicted",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
