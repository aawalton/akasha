import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaAdhd = {
  id: "01a0ba9d-fb06-7e25-b60e-86d7f8965060",
  type: "page-type/song",
  slug: "sia-adhd",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0441f43a-cd46-4cca-93d6-9641dc40f84e",
      externalLink: "https://musicbrainz.org/work/0441f43a-cd46-4cca-93d6-9641dc40f84e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ADHD",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
