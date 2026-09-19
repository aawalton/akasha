import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorItsAllMoThug = {
  id: "01a0b72f-42dd-74d7-9207-7278ac5879c7",
  type: "page-type/song",
  slug: "james-taylor-its-all-mo-thug",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d5948930-3150-4e67-92c3-a857e0f51895",
      externalLink: "https://musicbrainz.org/work/d5948930-3150-4e67-92c3-a857e0f51895",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s All Mo’ Thug",
  artist: "artist/james-taylor",
  performed: false,
  written: "collab",
} as const satisfies Song
