import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSpeakNow = {
  id: "019ea416-4251-787c-b28f-883484901cb6",
  type: "page-type/song",
  slug: "taylor-swift-speak-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ff0bc1b4-ba5e-3a4f-8447-17da5cb7c722",
      externalLink: "https://musicbrainz.org/work/ff0bc1b4-ba5e-3a4f-8447-17da5cb7c722",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Speak Now",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
