import type { Song } from "../../song.page-type.ts"

export const auroraBango = {
  id: "019ea4a6-4253-79fb-a413-e717fc626132",
  pageTypeSlug: "song",
  slug: "aurora-bango",
  title: "Bango",
  artistSlug: "aurora",
  externalId: "93049a8d-41f2-4dad-85f0-e71c0312a13b",
  externalLink: "https://musicbrainz.org/work/93049a8d-41f2-4dad-85f0-e71c0312a13b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
