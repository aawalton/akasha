import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSoHighSchool = {
  id: "019ea416-2e80-7432-9715-24ceae68e00a",
  type: "page-type/song",
  slug: "taylor-swift-so-high-school",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d0c6381-039f-44d4-9cd3-9286bdc9a610",
      externalLink: "https://musicbrainz.org/work/0d0c6381-039f-44d4-9cd3-9286bdc9a610",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "So High School",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
