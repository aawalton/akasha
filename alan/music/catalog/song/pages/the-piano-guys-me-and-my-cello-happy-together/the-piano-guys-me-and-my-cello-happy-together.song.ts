import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMeAndMyCelloHappyTogether = {
  id: "01a0b71e-9ae4-7566-b7c3-c55346f81181",
  type: "page-type/song",
  slug: "the-piano-guys-me-and-my-cello-happy-together",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6d84c186-3199-459c-97a6-ed46a00c4ea8",
      externalLink: "https://musicbrainz.org/work/6d84c186-3199-459c-97a6-ed46a00c4ea8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Me and My Cello (Happy Together)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
