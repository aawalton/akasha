import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftStarlight = {
  id: "019ea416-2fe7-7987-999e-62de3f5814ac",
  type: "page-type/song",
  slug: "taylor-swift-starlight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "221e6743-fe3c-4a92-af46-112a2462169f",
      externalLink: "https://musicbrainz.org/work/221e6743-fe3c-4a92-af46-112a2462169f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Starlight",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
