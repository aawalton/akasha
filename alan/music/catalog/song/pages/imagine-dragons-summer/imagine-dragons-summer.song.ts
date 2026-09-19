import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsSummer = {
  id: "019ea49c-586a-7fb6-8837-8303cb83be8d",
  type: "page-type/song",
  slug: "imagine-dragons-summer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "770e5cb1-0a29-4e97-8515-e77ff7d3af08",
      externalLink: "https://musicbrainz.org/work/770e5cb1-0a29-4e97-8515-e77ff7d3af08",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Summer",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
