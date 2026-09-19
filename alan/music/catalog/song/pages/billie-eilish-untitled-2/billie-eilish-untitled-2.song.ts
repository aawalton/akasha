import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishUntitled2 = {
  id: "01a0ba9f-acb6-7719-ba95-670eb5dcb6a8",
  type: "page-type/song",
  slug: "billie-eilish-untitled-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9bd6f68f-78d3-4c8d-8f87-547fd7931ab6",
      externalLink: "https://musicbrainz.org/work/9bd6f68f-78d3-4c8d-8f87-547fd7931ab6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "どんな君も",
  artist: "artist/billie-eilish",
  performed: false,
  written: "collab",
} as const satisfies Song
