import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedWeFellInLoveInOctober = {
  id: "01a0b724-d408-7968-abd5-d409e7c93767",
  type: "page-type/song",
  slug: "girl-in-red-we-fell-in-love-in-october",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a40e9504-76c9-4329-8f91-f9ed3434b6a4",
      externalLink: "https://musicbrainz.org/work/a40e9504-76c9-4329-8f91-f9ed3434b6a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "we fell in love in october",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
