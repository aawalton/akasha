import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiMyBodySMadeOfCrushedLittleStars = {
  id: "019f0ea3-9824-71f3-bbe0-76041264f4ae",
  type: "page-type/song",
  slug: "mitski-my-body-s-made-of-crushed-little-stars",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8ed4dedf-e075-4e14-80f7-5f45f9ad86e8",
      externalLink: "https://musicbrainz.org/work/8ed4dedf-e075-4e14-80f7-5f45f9ad86e8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Body’s Made of Crushed Little Stars",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
