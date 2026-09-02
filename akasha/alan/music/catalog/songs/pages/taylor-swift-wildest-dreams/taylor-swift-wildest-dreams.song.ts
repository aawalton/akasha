import type { Song } from "../../song.page-type.ts"

export const taylorSwiftWildestDreams = {
  id: "019ea416-4352-7c35-9511-fa84cfde4400",
  pageTypeSlug: "song",
  slug: "taylor-swift-wildest-dreams",
  title: "Wildest Dreams",
  artistSlug: "taylor-swift",
  externalId: "17567c60-83d9-4fa8-bd79-484ecfed8a26",
  externalLink: "https://musicbrainz.org/work/17567c60-83d9-4fa8-bd79-484ecfed8a26",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
