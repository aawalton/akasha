import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonImpossible = {
  id: "019ea4ae-721e-7a1c-b9a3-2cf2e33ec96e",
  type: "page-type/song",
  slug: "kelly-clarkson-impossible",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "57674686-c367-3949-ad92-ed4f34bd2b77",
      externalLink: "https://musicbrainz.org/work/57674686-c367-3949-ad92-ed4f34bd2b77",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Impossible",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
