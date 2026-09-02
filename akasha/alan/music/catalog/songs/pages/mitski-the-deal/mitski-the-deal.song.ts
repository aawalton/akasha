import type { Song } from "../../song.page-type.ts"

export const mitskiTheDeal = {
  id: "019f0e9c-b750-7ce5-8443-6acbe0dce022",
  pageTypeSlug: "song",
  slug: "mitski-the-deal",
  title: "The Deal",
  artistSlug: "mitski",
  externalId: "12b1bf0f-2e7d-4d73-98e1-bc042a4f51d0",
  externalLink: "https://musicbrainz.org/work/12b1bf0f-2e7d-4d73-98e1-bc042a4f51d0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
