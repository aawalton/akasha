import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCryingInTheRain = {
  id: "01a0b72f-243e-7a84-8959-0572b58140ea",
  type: "page-type/song",
  slug: "james-taylor-crying-in-the-rain",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "50cb0424-842f-3ef2-888c-a1adb5adc041",
      externalLink: "https://musicbrainz.org/work/50cb0424-842f-3ef2-888c-a1adb5adc041",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Crying in the Rain",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
