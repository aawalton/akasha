import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTranquilloMeltMyHeart = {
  id: "01a0b72f-508a-7295-af57-fa730bf8044b",
  type: "page-type/song",
  slug: "james-taylor-tranquillo-melt-my-heart",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8f643ce0-6e39-404a-ad2f-c74830e9b1b6",
      externalLink: "https://musicbrainz.org/work/8f643ce0-6e39-404a-ad2f-c74830e9b1b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tranquillo (Melt My Heart)",
  artist: "artist/james-taylor",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
