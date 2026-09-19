import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSuperman = {
  id: "019ea416-3ce8-75d0-ba9e-2c5b6253fc06",
  type: "page-type/song",
  slug: "taylor-swift-superman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cdf2af63-dc9b-4b32-a07c-f8f789bc4e4f",
      externalLink: "https://musicbrainz.org/work/cdf2af63-dc9b-4b32-a07c-f8f789bc4e4f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Superman",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
