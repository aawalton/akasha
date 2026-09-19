import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorInstrumentalI = {
  id: "01a0b72f-4547-7fed-ac26-96961c71856f",
  type: "page-type/song",
  slug: "james-taylor-instrumental-i",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f9d11d06-aed4-4ac5-8184-0e570aae9293",
      externalLink: "https://musicbrainz.org/work/f9d11d06-aed4-4ac5-8184-0e570aae9293",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Instrumental I",
  artist: "artist/james-taylor",
  performed: true,
  written: "solo",
} as const satisfies Song
