import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHarmless = {
  id: "01a0ba5d-3da8-7e9c-ae5c-7b407435bdd0",
  type: "page-type/song",
  slug: "coldplay-harmless",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5ecaf975-c71e-4b03-bb69-3bac7b05dab2",
      externalLink: "https://musicbrainz.org/work/5ecaf975-c71e-4b03-bb69-3bac7b05dab2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Harmless",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
} as const satisfies Song
