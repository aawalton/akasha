import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const taylorSwiftThugStory = {
  id: "019ea416-446c-78ba-8ebd-94b5411c215e",
  type: "song",
  slug: "taylor-swift-thug-story",
  title: "Thug Story",
  artist: "taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "34703215-1857-4551-b5d0-7eadc4213c8b",
      externalLink: "https://musicbrainz.org/work/34703215-1857-4551-b5d0-7eadc4213c8b",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  written: "collab",
} as const satisfies Song
