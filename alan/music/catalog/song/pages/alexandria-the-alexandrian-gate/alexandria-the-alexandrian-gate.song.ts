import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaTheAlexandrianGate = {
  id: "01a0b726-903d-7fb2-84b2-c1c1d4029eff",
  type: "page-type/song",
  slug: "alexandria-the-alexandrian-gate",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65eb8810-a829-4092-8b91-a3d2c56dc0a9",
      externalLink: "https://musicbrainz.org/recording/65eb8810-a829-4092-8b91-a3d2c56dc0a9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Alexandrian Gate",
  artist: "artist/alexandria",
  songType: "original",
  performed: true,
} as const satisfies Song
