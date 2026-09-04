import type { Song } from "../../song.page-type.ts"

export const arianaGrandeSideToSide = {
  id: "019ea4e4-f029-7eb2-b61b-809371c45e35",
  pageTypeSlug: "song",
  slug: "ariana-grande-side-to-side",
  title: "Side to Side",
  artistSlug: "ariana-grande",
  externalId: "465f790b-436f-4319-9200-219fbd832e97",
  externalLink: "https://musicbrainz.org/work/465f790b-436f-4319-9200-219fbd832e97",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
