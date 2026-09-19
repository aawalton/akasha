import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWeThreeKings = {
  id: "01a0b71e-98ca-75e2-a1db-baeb92401dd3",
  type: "page-type/song",
  slug: "the-piano-guys-we-three-kings",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "25fc855f-dddb-31e2-acc9-04ed47f6749d",
      externalLink: "https://musicbrainz.org/work/25fc855f-dddb-31e2-acc9-04ed47f6749d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We Three Kings",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
