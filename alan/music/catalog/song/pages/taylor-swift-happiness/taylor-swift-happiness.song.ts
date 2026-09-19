import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHappiness = {
  id: "019ea416-2721-7182-857d-aa1fac6ddf98",
  type: "page-type/song",
  slug: "taylor-swift-happiness",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a4b2e081-39fb-4aa5-a43e-df28c29bcf4d",
      externalLink: "https://musicbrainz.org/work/a4b2e081-39fb-4aa5-a43e-df28c29bcf4d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "happiness",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
