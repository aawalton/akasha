import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBreathe = {
  id: "019ea4c5-3dd0-7f53-a876-8208f2a5ccf7",
  type: "page-type/song",
  slug: "sia-breathe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a6cfc8f1-720c-4298-a6f2-63d7610afec3",
      externalLink: "https://musicbrainz.org/work/a6cfc8f1-720c-4298-a6f2-63d7610afec3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Breathe",
  artist: "artist/sia",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
