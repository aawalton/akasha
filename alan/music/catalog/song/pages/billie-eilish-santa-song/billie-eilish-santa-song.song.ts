import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishSantaSong = {
  id: "019ea4a8-d814-7524-8b67-4740fd938be5",
  type: "page-type/song",
  slug: "billie-eilish-santa-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2fa3279e-1235-4e1b-8ec3-71f978c3852f",
      externalLink: "https://musicbrainz.org/work/2fa3279e-1235-4e1b-8ec3-71f978c3852f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Santa Song",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
