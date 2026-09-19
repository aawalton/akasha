import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorEasyAsRollinOffALog = {
  id: "01a0b72f-27e3-7226-ae99-1ba21bb9408b",
  type: "page-type/song",
  slug: "james-taylor-easy-as-rollin-off-a-log",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "801e901f-4dc6-4a2d-9d6a-69d4ecdb0e96",
      externalLink: "https://musicbrainz.org/work/801e901f-4dc6-4a2d-9d6a-69d4ecdb0e96",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Easy as Rollin’ Off a Log",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
} as const satisfies Song
