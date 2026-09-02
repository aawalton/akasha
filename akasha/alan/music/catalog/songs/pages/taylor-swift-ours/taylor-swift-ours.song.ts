import type { Song } from "../../song.page-type.ts"

export const taylorSwiftOurs = {
  id: "019ea416-4151-7706-9769-645240ccb5c7",
  pageTypeSlug: "song",
  slug: "taylor-swift-ours",
  title: "Ours",
  artistSlug: "taylor-swift",
  externalId: "f2465a1f-5386-4031-93cc-5023371b6b3f",
  externalLink: "https://musicbrainz.org/work/f2465a1f-5386-4031-93cc-5023371b6b3f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
