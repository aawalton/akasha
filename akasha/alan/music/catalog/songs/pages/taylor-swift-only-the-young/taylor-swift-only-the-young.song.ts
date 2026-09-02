import type { Song } from "../../song.page-type.ts"

export const taylorSwiftOnlyTheYoung = {
  id: "019ea416-381f-7725-a4e3-f9c7662ee2fb",
  pageTypeSlug: "song",
  slug: "taylor-swift-only-the-young",
  title: "Only the Young",
  artistSlug: "taylor-swift",
  externalId: "7a597473-3eef-48aa-ac6a-49c632523ddc",
  externalLink: "https://musicbrainz.org/work/7a597473-3eef-48aa-ac6a-49c632523ddc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
