import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTheMissionHowGreatThouArt = {
  id: "01a0b71e-9e6d-76b5-bacd-d20a9672ed21",
  type: "page-type/song",
  slug: "the-piano-guys-the-mission-how-great-thou-art",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d6a82b97-9eef-4b62-b3f7-2522677124c0",
      externalLink: "https://musicbrainz.org/work/d6a82b97-9eef-4b62-b3f7-2522677124c0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Mission / How Great Thou Art",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
