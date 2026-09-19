import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftYouAreInLove = {
  id: "019ea416-49a5-7cca-97c4-a0c26e8d659e",
  type: "page-type/song",
  slug: "taylor-swift-you-are-in-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ae0a685e-025e-4cd5-9aed-117249daa3ff",
      externalLink: "https://musicbrainz.org/work/ae0a685e-025e-4cd5-9aed-117249daa3ff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Are in Love",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
