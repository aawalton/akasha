import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeEPiuTiPensoFromOnceUponATimeInAmerica = {
  id: "019ea4e2-6c19-741f-8953-7871a7eaef89",
  type: "page-type/song",
  slug: "ariana-grande-e-piu-ti-penso-from-once-upon-a-time-in-america",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "97558c26-7581-49c2-9c3c-b69c5f5623ea",
      externalLink: "https://musicbrainz.org/work/97558c26-7581-49c2-9c3c-b69c5f5623ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "E più ti penso (From “Once Upon a Time in America”)",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
