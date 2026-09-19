import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNewYearSDay = {
  id: "019ea416-37b9-7acb-a052-1fdfeef99cb9",
  type: "page-type/song",
  slug: "taylor-swift-new-year-s-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79330f57-d968-4800-aa5e-411f21a7202b",
      externalLink: "https://musicbrainz.org/work/79330f57-d968-4800-aa5e-411f21a7202b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "New Year’s Day",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
