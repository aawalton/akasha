import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMichaelMeetsMozart = {
  id: "01a0b71e-9853-770e-a47d-4991d79c78ba",
  type: "page-type/song",
  slug: "the-piano-guys-michael-meets-mozart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0c43e7aa-b823-45da-9e05-daf0e34e85d2",
      externalLink: "https://musicbrainz.org/work/0c43e7aa-b823-45da-9e05-daf0e34e85d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Michael Meets Mozart",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
