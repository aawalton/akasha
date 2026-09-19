import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHuntingHighAndLow = {
  id: "01a0ba5d-3f1c-7219-bd5f-b016aeb26519",
  type: "page-type/song",
  slug: "coldplay-hunting-high-and-low",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "783367a6-cac8-3191-a4d5-f6b41495dcd6",
      externalLink: "https://musicbrainz.org/work/783367a6-cac8-3191-a4d5-f6b41495dcd6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hunting High and Low",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
