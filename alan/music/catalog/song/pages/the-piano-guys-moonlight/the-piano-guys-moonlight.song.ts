import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMoonlight = {
  id: "01a0b71e-9faa-7538-8f50-de5984db7348",
  type: "page-type/song",
  slug: "the-piano-guys-moonlight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f8c6fdda-41e7-4498-b48d-52cdf559322a",
      externalLink: "https://musicbrainz.org/work/f8c6fdda-41e7-4498-b48d-52cdf559322a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Moonlight",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
