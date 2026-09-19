import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedGirlfriendIsBetter = {
  id: "01a0b724-d508-7bd6-8514-1f5d291b6c04",
  type: "page-type/song",
  slug: "girl-in-red-girlfriend-is-better",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bfd37b98-2574-359c-821d-64665c3f7268",
      externalLink: "https://musicbrainz.org/work/bfd37b98-2574-359c-821d-64665c3f7268",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Girlfriend Is Better",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
