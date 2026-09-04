import type { Song } from "../../song.page-type.ts"

export const siaBlankPage = {
  id: "019ea4c5-0d53-7b72-b946-87b3380f3b96",
  pageTypeSlug: "song",
  slug: "sia-blank-page",
  title: "Blank Page",
  artistSlug: "sia",
  externalId: "a00efe45-367b-4c82-8078-447d2cffb50a",
  externalLink: "https://musicbrainz.org/work/a00efe45-367b-4c82-8078-447d2cffb50a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
