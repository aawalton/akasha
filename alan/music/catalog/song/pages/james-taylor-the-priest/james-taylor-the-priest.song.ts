import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorThePriest = {
  id: "01a0b72f-46a4-7629-9dbb-2041f6d7041b",
  type: "page-type/song",
  slug: "james-taylor-the-priest",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "11fa9424-0e82-303b-95fd-5454d4ffdb2f",
      externalLink: "https://musicbrainz.org/work/11fa9424-0e82-303b-95fd-5454d4ffdb2f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Priest",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
