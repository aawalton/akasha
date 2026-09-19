import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBuckle = {
  id: "019f0ea6-cbbb-7ea5-98b5-bc642d42469c",
  type: "page-type/song",
  slug: "mitski-buckle",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d54c18ba-4a16-4a51-8a30-90269a89dd0a",
      externalLink: "https://musicbrainz.org/work/d54c18ba-4a16-4a51-8a30-90269a89dd0a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Buckle",
  artist: "artist/mitski",
  performed: false,
  written: "collab",
} as const satisfies Song
