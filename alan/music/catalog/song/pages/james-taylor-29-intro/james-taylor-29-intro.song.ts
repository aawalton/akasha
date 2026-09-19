import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylor29Intro = {
  id: "01a0b72f-2461-7258-bdc2-9b8a9d84ce8f",
  type: "page-type/song",
  slug: "james-taylor-29-intro",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "51b7c6c8-bcaf-46d0-ab64-6f233f807a21",
      externalLink: "https://musicbrainz.org/work/51b7c6c8-bcaf-46d0-ab64-6f233f807a21",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "29 Intro",
  artist: "artist/james-taylor",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
