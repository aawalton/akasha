import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSoItGoes = {
  id: "019ea416-2ee6-7aae-9a43-6400034989e2",
  type: "page-type/song",
  slug: "taylor-swift-so-it-goes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0fa1c672-5d8f-4b56-b304-a76c7ffb2525",
      externalLink: "https://musicbrainz.org/work/0fa1c672-5d8f-4b56-b304-a76c7ffb2525",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "So It Goes…",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
