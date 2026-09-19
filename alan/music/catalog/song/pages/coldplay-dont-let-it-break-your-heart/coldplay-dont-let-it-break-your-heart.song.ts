import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDontLetItBreakYourHeart = {
  id: "01a0ba5d-3a52-7776-9de0-8c22829afbf2",
  type: "page-type/song",
  slug: "coldplay-dont-let-it-break-your-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "22255d88-202d-4195-be25-0f4e97592ccf",
      externalLink: "https://musicbrainz.org/work/22255d88-202d-4195-be25-0f4e97592ccf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Let It Break Your Heart",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
