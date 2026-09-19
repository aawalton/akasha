import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWaterUnderTheBridge = {
  id: "01a0b720-160a-7abc-8e6c-5fb73e4b8793",
  type: "page-type/song",
  slug: "celtic-woman-water-under-the-bridge",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f43e4719-4f3d-4e7c-bc76-3832b682736f",
      externalLink: "https://musicbrainz.org/work/f43e4719-4f3d-4e7c-bc76-3832b682736f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Water Under the Bridge",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
