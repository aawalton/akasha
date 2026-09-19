import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBlueprint = {
  id: "01a0b723-bf3a-7c7d-b57c-94a068589d94",
  type: "page-type/song",
  slug: "sabrina-carpenter-blueprint",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "00a921fe-5ad3-4843-bdc3-08ea2434e1ed",
      externalLink: "https://musicbrainz.org/work/00a921fe-5ad3-4843-bdc3-08ea2434e1ed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "blueprint",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
