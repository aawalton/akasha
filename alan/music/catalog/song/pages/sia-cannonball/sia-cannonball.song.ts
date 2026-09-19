import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaCannonball = {
  id: "019ea4c3-7343-747b-bf6c-cf53672d8e3c",
  type: "page-type/song",
  slug: "sia-cannonball",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "45c69e18-695d-41fd-ade9-fd1bfd24bed5",
      externalLink: "https://musicbrainz.org/work/45c69e18-695d-41fd-ade9-fd1bfd24bed5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cannonball",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
