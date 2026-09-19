import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanGranuailesDance = {
  id: "01a0b720-0e4b-7872-a689-a0d79cbac1ff",
  type: "page-type/song",
  slug: "celtic-woman-granuailes-dance",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6ffb593b-e8c1-4ffd-953c-e091bf219d49",
      externalLink: "https://musicbrainz.org/work/6ffb593b-e8c1-4ffd-953c-e091bf219d49",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Granuaile’s Dance",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
