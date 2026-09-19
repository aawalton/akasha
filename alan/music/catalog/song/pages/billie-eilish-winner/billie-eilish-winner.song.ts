import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishWinner = {
  id: "019ea4aa-fbf3-7009-82cb-0572f8eaa493",
  type: "page-type/song",
  slug: "billie-eilish-winner",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af40fe56-5e2f-4f7e-8b03-a1ca5528ba45",
      externalLink: "https://musicbrainz.org/work/af40fe56-5e2f-4f7e-8b03-a1ca5528ba45",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Winner",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
