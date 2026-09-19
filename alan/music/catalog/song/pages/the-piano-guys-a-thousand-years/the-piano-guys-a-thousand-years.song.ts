import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAThousandYears = {
  id: "01a0b71e-9948-75b2-8630-d2bc112371ae",
  type: "page-type/song",
  slug: "the-piano-guys-a-thousand-years",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2cb8d852-60c7-4e63-88f0-487624de93bd",
      externalLink: "https://musicbrainz.org/work/2cb8d852-60c7-4e63-88f0-487624de93bd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Thousand Years",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
