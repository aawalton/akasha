import type { Song } from "../../song.page-type.ts"

export const mitskiThursdayGirl = {
  id: "019f0ea2-2c86-7beb-a612-a8d426ba6ffb",
  pageTypeSlug: "song",
  slug: "mitski-thursday-girl",
  title: "Thursday Girl",
  artistSlug: "mitski",
  externalId: "76cd3d78-2bc5-4e36-9454-0e31e47365d2",
  externalLink: "https://musicbrainz.org/work/76cd3d78-2bc5-4e36-9454-0e31e47365d2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
