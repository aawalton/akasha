import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeItWasAMaskedChristmas = {
  id: "01a0b76f-e3ab-7076-8687-097d5061eded",
  type: "page-type/song",
  slug: "ariana-grande-it-was-a-masked-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5a9ec12b-d672-4c7c-ae4c-162ef5a607b5",
      externalLink: "https://musicbrainz.org/work/5a9ec12b-d672-4c7c-ae4c-162ef5a607b5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It Was a… (Masked Christmas)",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
