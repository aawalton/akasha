import type { Song } from "../../song.page-type.ts"

export const kellyClarksonTipOfMyTongue = {
  id: "019ea4b1-f93f-7945-8efd-461c5359028d",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-tip-of-my-tongue",
  title: "Tip of My Tongue",
  artistSlug: "kelly-clarkson",
  externalId: "3e76ba3f-d204-3981-b7f3-da57f6d79bfe",
  externalLink: "https://musicbrainz.org/work/3e76ba3f-d204-3981-b7f3-da57f6d79bfe",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
