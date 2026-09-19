import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysStoryOfMyLife = {
  id: "01a0b71e-9d56-7407-971b-2ef01f1efad1",
  type: "page-type/song",
  slug: "the-piano-guys-story-of-my-life",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c4ad155e-8409-494a-b664-cf78a6e473dc",
      externalLink: "https://musicbrainz.org/work/c4ad155e-8409-494a-b664-cf78a6e473dc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Story of My Life",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
