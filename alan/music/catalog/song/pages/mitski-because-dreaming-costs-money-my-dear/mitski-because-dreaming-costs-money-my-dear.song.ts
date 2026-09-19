import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBecauseDreamingCostsMoneyMyDear = {
  id: "019f0ea5-aca0-7643-9edd-758bd5385da3",
  type: "page-type/song",
  slug: "mitski-because-dreaming-costs-money-my-dear",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b86308a4-8d63-44ef-87c4-4be664b17bc4",
      externalLink: "https://musicbrainz.org/work/b86308a4-8d63-44ef-87c4-4be664b17bc4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Because Dreaming Costs Money, My Dear",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
