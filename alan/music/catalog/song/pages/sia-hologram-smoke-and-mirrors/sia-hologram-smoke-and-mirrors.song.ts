import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHologramSmokeAndMirrors = {
  id: "019ea4c9-d8bc-74a5-b0e4-46fe3f1998bd",
  type: "page-type/song",
  slug: "sia-hologram-smoke-and-mirrors",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c40c7165-1d98-4e82-8df0-cdb9cddefc10",
      externalLink: "https://musicbrainz.org/work/c40c7165-1d98-4e82-8df0-cdb9cddefc10",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hologram (Smoke and Mirrors)",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
