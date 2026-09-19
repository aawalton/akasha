import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsOneDay = {
  id: "019ea498-886c-7df5-80ad-86c18ce26aed",
  type: "page-type/song",
  slug: "imagine-dragons-one-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5ea54c26-1595-4e64-8797-7f661fe296e2",
      externalLink: "https://musicbrainz.org/work/5ea54c26-1595-4e64-8797-7f661fe296e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Day",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
