import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSoberAndUnkissed = {
  id: "019ea4cc-42a2-7d3c-8b09-8c126b21555c",
  type: "song",
  slug: "sia-sober-and-unkissed",
  title: "Sober and Unkissed",
  artist: "artist/sia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4c931f3d-6de6-4c7a-a42a-3176004c16d7",
      externalLink: "https://musicbrainz.org/work/4c931f3d-6de6-4c7a-a42a-3176004c16d7",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
