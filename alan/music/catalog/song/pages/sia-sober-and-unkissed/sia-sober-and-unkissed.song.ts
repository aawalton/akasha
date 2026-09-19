import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSoberAndUnkissed = {
  id: "019ea4cc-42a2-7d3c-8b09-8c126b21555c",
  type: "page-type/song",
  slug: "sia-sober-and-unkissed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4c931f3d-6de6-4c7a-a42a-3176004c16d7",
      externalLink: "https://musicbrainz.org/work/4c931f3d-6de6-4c7a-a42a-3176004c16d7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sober and Unkissed",
  artist: "artist/sia",
  performed: true,
  written: "collab",
} as const satisfies Song
