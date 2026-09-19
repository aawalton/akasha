import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaFreeTheAnimal = {
  id: "019ea4c6-833c-7e74-979e-8f00c237434e",
  type: "page-type/song",
  slug: "sia-free-the-animal",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0178adc5-8239-415f-92ba-66eafef78199",
      externalLink: "https://musicbrainz.org/work/0178adc5-8239-415f-92ba-66eafef78199",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Free the Animal",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
