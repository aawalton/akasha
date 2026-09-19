import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorLetItAllFallDown = {
  id: "01a0b72f-38c7-7fa4-8314-be25feecbb5a",
  type: "page-type/song",
  slug: "james-taylor-let-it-all-fall-down",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "794213b6-b1a8-4c8b-9c8b-cd4fcfa2f4ed",
      externalLink: "https://musicbrainz.org/work/794213b6-b1a8-4c8b-9c8b-cd4fcfa2f4ed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let It All Fall Down",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
