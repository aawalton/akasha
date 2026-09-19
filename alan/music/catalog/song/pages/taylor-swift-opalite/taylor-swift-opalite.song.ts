import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftOpalite = {
  id: "019ea416-3f9b-7a30-9e96-f40b6ec05f9a",
  type: "page-type/song",
  slug: "taylor-swift-opalite",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eb78d1a6-9d61-4f21-a49e-cca7160a21e2",
      externalLink: "https://musicbrainz.org/work/eb78d1a6-9d61-4f21-a49e-cca7160a21e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Opalite",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
