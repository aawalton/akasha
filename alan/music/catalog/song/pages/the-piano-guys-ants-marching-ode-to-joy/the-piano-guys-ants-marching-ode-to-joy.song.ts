import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAntsMarchingOdeToJoy = {
  id: "01a0b71e-9c14-7f1c-86cd-1215a75b67d1",
  type: "page-type/song",
  slug: "the-piano-guys-ants-marching-ode-to-joy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8965a095-0b5a-4964-b8e3-49c18a13d414",
      externalLink: "https://musicbrainz.org/work/8965a095-0b5a-4964-b8e3-49c18a13d414",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ants Marching / Ode to Joy",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
