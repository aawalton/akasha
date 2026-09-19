import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBadThing = {
  id: "019f0ea7-13a6-7773-b9a9-934917876042",
  type: "page-type/song",
  slug: "mitski-bad-thing",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d9c1e89a-2374-47eb-9b1c-8f1b3b57bc54",
      externalLink: "https://musicbrainz.org/work/d9c1e89a-2374-47eb-9b1c-8f1b3b57bc54",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Thing",
  artist: "artist/mitski",
  performed: false,
  written: "collab",
} as const satisfies Song
