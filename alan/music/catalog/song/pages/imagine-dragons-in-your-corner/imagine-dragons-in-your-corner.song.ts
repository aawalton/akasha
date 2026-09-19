import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsInYourCorner = {
  id: "019ea49b-015f-7bc4-bcb6-fd7c007e8c66",
  type: "page-type/song",
  slug: "imagine-dragons-in-your-corner",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e56975e5-11fd-4e5b-938b-8c8169cd478c",
      externalLink: "https://musicbrainz.org/work/e56975e5-11fd-4e5b-938b-8c8169cd478c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In Your Corner",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
