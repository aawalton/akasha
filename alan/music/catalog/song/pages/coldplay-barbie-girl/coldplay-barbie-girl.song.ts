import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayBarbieGirl = {
  id: "01a0ba5d-41bf-7d55-bb86-034d15737cd8",
  type: "page-type/song",
  slug: "coldplay-barbie-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "907b9071-6b1f-3bfc-83f1-7331da9c71fb",
      externalLink: "https://musicbrainz.org/work/907b9071-6b1f-3bfc-83f1-7331da9c71fb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Barbie Girl",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
