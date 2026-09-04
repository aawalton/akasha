import type { Song } from "../../song.page-type.ts"

export const taylorSwiftNeedYouNow = {
  id: "019ea416-31bd-736a-823d-44f92454785c",
  pageTypeSlug: "song",
  slug: "taylor-swift-need-you-now",
  title: "Need You Now",
  artistSlug: "taylor-swift",
  externalId: "3de1ab2b-cfd0-4113-815d-816e3448568c",
  externalLink: "https://musicbrainz.org/work/3de1ab2b-cfd0-4113-815d-816e3448568c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
