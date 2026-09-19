import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSafeSound = {
  id: "01a0b723-d4ae-702f-b64d-a7fee663061d",
  type: "page-type/song",
  slug: "sabrina-carpenter-safe-sound",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63899fdd-242f-4e29-a3cd-d3fbfb98f333",
      externalLink: "https://musicbrainz.org/work/63899fdd-242f-4e29-a3cd-d3fbfb98f333",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Safe & Sound",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
