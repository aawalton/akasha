import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const auroraBelugaEscape = {
  id: "019ea4a4-4467-73bc-bac7-3c2eecf3e78c",
  type: "song",
  slug: "aurora-beluga-escape",
  title: "Beluga Escape",
  artist: "aurora",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a728258-9557-426a-92bb-daa9f49f0823",
      externalLink: "https://musicbrainz.org/work/3a728258-9557-426a-92bb-daa9f49f0823",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
