import type { Song } from "../../song.page-type.ts"

export const taylorSwiftMidnightRain = {
  id: "019ea416-331b-7f96-8bf1-f9ac087bda7c",
  pageTypeSlug: "song",
  slug: "taylor-swift-midnight-rain",
  title: "Midnight Rain",
  artistSlug: "taylor-swift",
  externalId: "5182b11e-9b69-445c-adf0-74f6a9ac0aef",
  externalLink: "https://musicbrainz.org/work/5182b11e-9b69-445c-adf0-74f6a9ac0aef",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
