import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLove = {
  id: "019ea416-1a85-7538-a7c9-c1c3cf00b89d",
  pageTypeSlug: "song",
  type: "song",
  slug: "taylor-swift-love",
  title: "Love",
  artist: "taylor-swift",
  externalId: "1739eca0-5488-4c92-ab58-d4f5ac72e711",
  externalLink: "https://musicbrainz.org/work/1739eca0-5488-4c92-ab58-d4f5ac72e711",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
} as const satisfies Song
