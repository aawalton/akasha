import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIMayNotBeYourKind = {
  id: "01a0b72f-441a-7aa1-858b-80dd29678b76",
  type: "page-type/song",
  slug: "james-taylor-i-may-not-be-your-kind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee18b6b3-408e-4560-b390-75c441eb2edb",
      externalLink: "https://musicbrainz.org/work/ee18b6b3-408e-4560-b390-75c441eb2edb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I May Not Be Your Kind",
  artist: "artist/james-taylor",
  performed: false,
  written: "collab",
  createdAt: "2026-09-19T01:02:03.290Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
