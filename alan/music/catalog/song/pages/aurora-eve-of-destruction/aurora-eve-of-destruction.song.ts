import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraEveOfDestruction = {
  id: "019ea4a4-d97d-7fcd-aa06-34e3a10f9a6d",
  type: "page-type/song",
  slug: "aurora-eve-of-destruction",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4df6b320-84c2-4dd9-95ae-99f6c551b4bb",
      externalLink: "https://musicbrainz.org/work/4df6b320-84c2-4dd9-95ae-99f6c551b4bb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Eve of Destruction",
  artist: "artist/aurora",
  performed: false,
  written: "collab",
} as const satisfies Song
