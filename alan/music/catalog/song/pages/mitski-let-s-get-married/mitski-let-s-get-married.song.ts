import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiLetSGetMarried = {
  id: "019f0e9d-9b04-73f0-be46-ee10bb105a18",
  type: "page-type/song",
  slug: "mitski-let-s-get-married",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "24ec7434-78ce-4808-8131-c37778f871a6",
      externalLink: "https://musicbrainz.org/work/24ec7434-78ce-4808-8131-c37778f871a6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let’s Get Married",
  artist: "artist/mitski",
  performed: true,
  createdAt: "2026-06-28T14:23:57.700Z",
  updatedAt: "2026-09-19T17:05:22.000Z",
} as const satisfies Song
