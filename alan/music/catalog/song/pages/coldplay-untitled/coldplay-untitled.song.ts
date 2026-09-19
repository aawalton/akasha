import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUntitled = {
  id: "01a0ba5d-3bc7-71db-9b92-59bb29870159",
  type: "page-type/song",
  slug: "coldplay-untitled",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "384ee7fd-f953-410e-b8fc-ce18ad5a69b3",
      externalLink: "https://musicbrainz.org/work/384ee7fd-f953-410e-b8fc-ce18ad5a69b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "♾",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
