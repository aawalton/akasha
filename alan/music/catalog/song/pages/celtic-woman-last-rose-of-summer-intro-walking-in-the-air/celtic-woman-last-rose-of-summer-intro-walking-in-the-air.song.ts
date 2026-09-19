import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanLastRoseOfSummerIntroWalkingInTheAir = {
  id: "01a0b720-094a-7163-88ee-f129fba2af94",
  type: "page-type/song",
  slug: "celtic-woman-last-rose-of-summer-intro-walking-in-the-air",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "25fe8e7e-658d-382a-a27e-0696d8ec78fb",
      externalLink: "https://musicbrainz.org/work/25fe8e7e-658d-382a-a27e-0696d8ec78fb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Last Rose of Summer (intro) / Walking in the Air",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
