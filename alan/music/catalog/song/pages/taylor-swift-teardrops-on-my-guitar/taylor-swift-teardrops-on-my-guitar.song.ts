import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTeardropsOnMyGuitar = {
  id: "019ea416-3c16-7a6c-b6c7-9ad3a1890251",
  type: "page-type/song",
  slug: "taylor-swift-teardrops-on-my-guitar",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bcffb49d-9d17-43aa-9e0d-88ce7dc4ebfb",
      externalLink: "https://musicbrainz.org/work/bcffb49d-9d17-43aa-9e0d-88ce7dc4ebfb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Teardrops on My Guitar",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
