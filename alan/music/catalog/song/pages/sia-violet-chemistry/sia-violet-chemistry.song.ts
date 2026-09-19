import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaVioletChemistry = {
  id: "019ea4cc-dfb3-7e2e-bc8e-44243ff01fef",
  type: "page-type/song",
  slug: "sia-violet-chemistry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "80e8b3bc-6aca-448e-a108-ba086d5518e2",
      externalLink: "https://musicbrainz.org/work/80e8b3bc-6aca-448e-a108-ba086d5518e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Violet Chemistry",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
