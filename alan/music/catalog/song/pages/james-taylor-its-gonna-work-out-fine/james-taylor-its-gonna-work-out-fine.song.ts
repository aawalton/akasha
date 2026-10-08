import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorItsGonnaWorkOutFine = {
  id: "01a0b72f-42bd-7422-a7cd-ab23cbf1077d",
  type: "page-type/song",
  slug: "james-taylor-its-gonna-work-out-fine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d4b7899b-3daf-4fe3-88a0-1b57b99faf8f",
      externalLink: "https://musicbrainz.org/work/d4b7899b-3daf-4fe3-88a0-1b57b99faf8f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Gonna Work Out Fine",
  artist: "artist/james-taylor",
  performed: true,
  createdAt: "2026-09-19T01:02:02.941Z",
  updatedAt: "2026-09-19T16:23:44.000Z",
} as const satisfies Song
