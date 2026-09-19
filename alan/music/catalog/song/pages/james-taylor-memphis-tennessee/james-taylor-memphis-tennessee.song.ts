import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMemphisTennessee = {
  id: "01a0b72f-32a5-7775-9129-76ad4f50f06b",
  type: "page-type/song",
  slug: "james-taylor-memphis-tennessee",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0b350225-9ddb-3c0a-aff9-26536778f85b",
      externalLink: "https://musicbrainz.org/work/0b350225-9ddb-3c0a-aff9-26536778f85b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Memphis, Tennessee",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
