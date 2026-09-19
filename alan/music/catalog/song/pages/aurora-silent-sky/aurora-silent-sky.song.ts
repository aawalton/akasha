import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSilentSky = {
  id: "019ea4a5-f231-7590-a2b9-625bc0da4ff7",
  type: "page-type/song",
  slug: "aurora-silent-sky",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "787cc6e3-5fd9-4730-b486-09fa618ad6cd",
      externalLink: "https://musicbrainz.org/work/787cc6e3-5fd9-4730-b486-09fa618ad6cd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Silent Sky",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
