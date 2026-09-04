import type { Song } from "../../song.page-type.ts"

export const mitskiBadThing = {
  id: "019f0ea7-13a6-7773-b9a9-934917876042",
  pageTypeSlug: "song",
  slug: "mitski-bad-thing",
  title: "Bad Thing",
  artistSlug: "mitski",
  externalId: "d9c1e89a-2374-47eb-9b1c-8f1b3b57bc54",
  externalLink: "https://musicbrainz.org/work/d9c1e89a-2374-47eb-9b1c-8f1b3b57bc54",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
