import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaAlexandriaRemix = {
  id: "01a0b726-8d2d-772c-b8d4-53691e248abd",
  type: "page-type/song",
  slug: "alexandria-alexandria-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d001c11b-8070-4f5e-846d-751704c299f1",
      externalLink: "https://musicbrainz.org/recording/d001c11b-8070-4f5e-846d-751704c299f1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Мимолётности (Alexandria remix)",
  artist: "artist/alexandria",
  songType: "derivative",
  performed: true,
} as const satisfies Song
