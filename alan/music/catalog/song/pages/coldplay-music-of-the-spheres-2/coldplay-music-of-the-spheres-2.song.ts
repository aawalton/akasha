import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMusicOfTheSpheres2 = {
  id: "01a0ba5d-4c62-7f56-9aae-d6cec425ef03",
  type: "page-type/song",
  slug: "coldplay-music-of-the-spheres-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d4681e2-497a-4bc0-957c-c7506e22366f",
      externalLink: "https://musicbrainz.org/work/0d4681e2-497a-4bc0-957c-c7506e22366f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Music of the Spheres 2",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
