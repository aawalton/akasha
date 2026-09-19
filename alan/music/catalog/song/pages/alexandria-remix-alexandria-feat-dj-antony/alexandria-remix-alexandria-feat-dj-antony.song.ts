import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaRemixAlexandriaFeatDjAntony = {
  id: "01a0b726-8ff5-7ae5-8827-3ff1dc1c5898",
  type: "page-type/song",
  slug: "alexandria-remix-alexandria-feat-dj-antony",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "db44b97e-c86a-4074-969c-e435ba9fd5ac",
      externalLink: "https://musicbrainz.org/recording/db44b97e-c86a-4074-969c-e435ba9fd5ac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Время (remix Alexandria feat. DJ Antony)",
  artist: "artist/alexandria",
  songType: "derivative",
  performed: true,
} as const satisfies Song
