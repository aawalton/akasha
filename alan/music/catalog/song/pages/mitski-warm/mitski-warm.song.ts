import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiWarm = {
  id: "019f0ea2-778c-7fc8-98bb-93ed6bc4894b",
  type: "page-type/song",
  slug: "mitski-warm",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7c0af959-0501-4da4-b318-f9bddd2dabc2",
      externalLink: "https://musicbrainz.org/work/7c0af959-0501-4da4-b318-f9bddd2dabc2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Warm",
  artist: "artist/mitski",
  performed: false,
  written: "collab",
} as const satisfies Song
