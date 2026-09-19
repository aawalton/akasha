import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraInfectionsOfADifferentKind = {
  id: "019ea4a7-47b7-7abe-bada-dc4cf62f8e87",
  type: "page-type/song",
  slug: "aurora-infections-of-a-different-kind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e7dd0918-6223-48e7-be1c-62626dc25dbf",
      externalLink: "https://musicbrainz.org/work/e7dd0918-6223-48e7-be1c-62626dc25dbf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Infections of a Different Kind",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
