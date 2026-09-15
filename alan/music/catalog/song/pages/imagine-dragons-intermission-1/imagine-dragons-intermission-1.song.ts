import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIntermission1 = {
  id: "019ea499-2436-7011-861d-41f36646bfb9",
  type: "song",
  slug: "imagine-dragons-intermission-1",
  title: "Intermission #1",
  artist: "artist/imagine-dragons",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a6e75d9-9282-44fa-a8c4-7194b214ea94",
      externalLink: "https://musicbrainz.org/work/7a6e75d9-9282-44fa-a8c4-7194b214ea94",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
