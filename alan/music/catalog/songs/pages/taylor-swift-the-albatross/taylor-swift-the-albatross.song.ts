import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheAlbatross = {
  id: "019ea416-3adc-7ef3-9f58-a037dd6e61f6",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-albatross",
  title: "The Albatross",
  artistSlug: "taylor-swift",
  externalId: "b16483fe-228c-4120-94bc-d724db159493",
  externalLink: "https://musicbrainz.org/work/b16483fe-228c-4120-94bc-d724db159493",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
