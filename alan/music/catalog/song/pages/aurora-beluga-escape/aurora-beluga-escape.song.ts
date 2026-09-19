import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraBelugaEscape = {
  id: "019ea4a4-4467-73bc-bac7-3c2eecf3e78c",
  type: "page-type/song",
  slug: "aurora-beluga-escape",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a728258-9557-426a-92bb-daa9f49f0823",
      externalLink: "https://musicbrainz.org/work/3a728258-9557-426a-92bb-daa9f49f0823",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beluga Escape",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
