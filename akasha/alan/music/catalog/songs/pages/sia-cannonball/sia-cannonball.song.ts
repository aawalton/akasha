import type { Song } from "../../song.page-type.ts"

export const siaCannonball = {
  id: "019ea4c3-7343-747b-bf6c-cf53672d8e3c",
  pageTypeSlug: "song",
  slug: "sia-cannonball",
  title: "Cannonball",
  artistSlug: "sia",
  externalId: "45c69e18-695d-41fd-ade9-fd1bfd24bed5",
  externalLink: "https://musicbrainz.org/work/45c69e18-695d-41fd-ade9-fd1bfd24bed5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
