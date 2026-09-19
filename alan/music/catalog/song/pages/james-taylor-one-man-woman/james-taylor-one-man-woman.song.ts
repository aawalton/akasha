import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOneManWoman = {
  id: "01a0b72f-3ee9-7b8f-98b7-69afaca24743",
  type: "page-type/song",
  slug: "james-taylor-one-man-woman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b83df90c-de50-44cf-bdb7-d3fa0cc3edb6",
      externalLink: "https://musicbrainz.org/work/b83df90c-de50-44cf-bdb7-d3fa0cc3edb6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Man Woman",
  artist: "artist/james-taylor",
  songType: "original",
  performed: false,
  written: "solo",
} as const satisfies Song
