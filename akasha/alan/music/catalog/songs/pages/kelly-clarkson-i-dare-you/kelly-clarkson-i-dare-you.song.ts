import type { Song } from "../../song.page-type.ts"

export const kellyClarksonIDareYou = {
  id: "019ea4ac-bc11-799b-8ecd-758f1983878f",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-i-dare-you",
  title: "I Dare You",
  artistSlug: "kelly-clarkson",
  externalId: "08b3ebac-7fa6-4574-90cc-6ec495aa327c",
  externalLink: "https://musicbrainz.org/work/08b3ebac-7fa6-4574-90cc-6ec495aa327c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
