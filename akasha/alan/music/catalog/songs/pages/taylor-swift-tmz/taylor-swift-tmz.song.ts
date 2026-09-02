import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTmz = {
  id: "019ea416-46f5-7364-8a0a-779efe80a784",
  pageTypeSlug: "song",
  slug: "taylor-swift-tmz",
  title: "TMZ",
  artistSlug: "taylor-swift",
  externalId: "839fca48-3c66-4d31-aa65-931fc65ddf77",
  externalLink: "https://musicbrainz.org/work/839fca48-3c66-4d31-aa65-931fc65ddf77",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: false,
  written: "collab",
} as const satisfies Song
