import type { Song } from "../../song.page-type.ts"

export const billieEilishAnotherStupidSong = {
  id: "019ea4a8-ae67-7991-a329-01431a2d7b80",
  pageTypeSlug: "song",
  slug: "billie-eilish-another-stupid-song",
  title: "another stupid song",
  artistSlug: "billie-eilish",
  externalId: "26e23d15-8b14-476f-9d0e-16404b4435dc",
  externalLink: "https://musicbrainz.org/work/26e23d15-8b14-476f-9d0e-16404b4435dc",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
