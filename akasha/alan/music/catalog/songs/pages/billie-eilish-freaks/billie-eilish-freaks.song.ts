import type { Song } from "../../song.page-type.ts"

export const billieEilishFreaks = {
  id: "019ea4a9-807f-7c7c-8c71-fed0c51b9681",
  pageTypeSlug: "song",
  slug: "billie-eilish-freaks",
  title: "Freaks",
  artistSlug: "billie-eilish",
  externalId: "50cca196-9ef2-454e-88e0-56863fdab25d",
  externalLink: "https://musicbrainz.org/work/50cca196-9ef2-454e-88e0-56863fdab25d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
