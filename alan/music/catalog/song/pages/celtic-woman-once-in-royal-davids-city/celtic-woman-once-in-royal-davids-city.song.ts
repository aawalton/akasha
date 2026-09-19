import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOnceInRoyalDavidsCity = {
  id: "01a0b720-0b15-7716-8ba6-62b3c4751c8c",
  type: "page-type/song",
  slug: "celtic-woman-once-in-royal-davids-city",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "37de7c6c-9f2d-385d-b04c-0567d038dc57",
      externalLink: "https://musicbrainz.org/work/37de7c6c-9f2d-385d-b04c-0567d038dc57",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Once in Royal David’s City",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
