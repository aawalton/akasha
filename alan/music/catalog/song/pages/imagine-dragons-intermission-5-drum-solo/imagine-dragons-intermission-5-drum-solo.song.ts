import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIntermission5DrumSolo = {
  id: "019ea49a-82a7-7e1d-ba30-8993035ae7f7",
  type: "page-type/song",
  slug: "imagine-dragons-intermission-5-drum-solo",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c3225b8a-5d93-42b2-b469-55d5ea13400a",
      externalLink: "https://musicbrainz.org/work/c3225b8a-5d93-42b2-b469-55d5ea13400a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Intermission #5: Drum Solo",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
