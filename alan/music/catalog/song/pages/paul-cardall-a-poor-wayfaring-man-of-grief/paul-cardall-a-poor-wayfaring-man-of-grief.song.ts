import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAPoorWayfaringManOfGrief = {
  id: "01a0b717-5339-789a-ad5b-c3f75bd5f81c",
  type: "page-type/song",
  slug: "paul-cardall-a-poor-wayfaring-man-of-grief",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a273263-287e-4992-869d-409e2064a73b",
      externalLink: "https://musicbrainz.org/work/3a273263-287e-4992-869d-409e2064a73b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Poor Wayfaring Man of Grief",
  artist: "artist/paul-cardall",
  performed: false,
} as const satisfies Song
