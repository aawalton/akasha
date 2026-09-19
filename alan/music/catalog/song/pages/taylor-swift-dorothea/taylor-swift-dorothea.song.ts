import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDorothea = {
  id: "019ea416-05d5-79a0-b5fe-75e5aea9d6e4",
  type: "page-type/song",
  slug: "taylor-swift-dorothea",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "37b4775d-f529-4a37-addf-208b1c1d2952",
      externalLink: "https://musicbrainz.org/work/37b4775d-f529-4a37-addf-208b1c1d2952",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "dorothea",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
