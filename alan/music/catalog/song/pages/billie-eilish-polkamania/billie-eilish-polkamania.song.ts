import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishPolkamania = {
  id: "01a0ba9f-9edb-7e4f-be4d-f1b5982d4884",
  type: "page-type/song",
  slug: "billie-eilish-polkamania",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6603b8b5-12b1-4705-a445-9227a27d997f",
      externalLink: "https://musicbrainz.org/work/6603b8b5-12b1-4705-a445-9227a27d997f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Polkamania!",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
