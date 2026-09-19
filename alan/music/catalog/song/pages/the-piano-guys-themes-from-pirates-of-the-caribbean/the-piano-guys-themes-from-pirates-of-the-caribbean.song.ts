import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysThemesFromPiratesOfTheCaribbean = {
  id: "01a0b71e-9f00-710a-95d3-a68ce235f9ca",
  type: "page-type/song",
  slug: "the-piano-guys-themes-from-pirates-of-the-caribbean",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ee607f7b-1adb-4fa9-9c61-dabfcc2cfed0",
      externalLink: "https://musicbrainz.org/work/ee607f7b-1adb-4fa9-9c61-dabfcc2cfed0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Themes from Pirates of the Caribbean",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
