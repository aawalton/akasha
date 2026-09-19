import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorComingBackToYou = {
  id: "01a0b72f-247d-7edd-bc13-ce57fc529f6b",
  type: "page-type/song",
  slug: "james-taylor-coming-back-to-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "51da84c2-c13a-3ad1-b44c-cdc0a19eeec6",
      externalLink: "https://musicbrainz.org/work/51da84c2-c13a-3ad1-b44c-cdc0a19eeec6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Coming Back to You",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
