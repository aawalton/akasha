import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNeverGrowUp = {
  id: "019ea416-3dfa-7293-9f7c-209dae686435",
  type: "page-type/song",
  slug: "taylor-swift-never-grow-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d81df650-873c-3a8d-a021-bf66f1cc5804",
      externalLink: "https://musicbrainz.org/work/d81df650-873c-3a8d-a021-bf66f1cc5804",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Grow Up",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
