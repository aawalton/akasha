import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaDonTTellMeYouDoSong9 = {
  id: "01a0d52b-52dd-7a74-aaa9-f7a213ce98db",
  type: "page-type/track",
  slug: "rockapella-don-t-tell-me-you-do-song-9",
  ownLength: 3.5837666666666665,
  ownProgress: 3.5837666666666665,
  partOfCollections: ["release/rockapella-don-t-tell-me-you-do"],
  status: "completed",
  unit: "unit/minutes",
  title: "Song 9",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "song9|1AFSUleuDTapVhm5zUf4ix|215026",
  song: "song/rockapella-song-9",
  carriedBy: [
    {
      release: "release/rockapella-don-t-tell-me-you-do",
      discNumber: 1,
      position: 8,
      externalId: "3dh8hS8R1BdVKowlzgIzDm",
      externalLink: "https://open.spotify.com/track/3dh8hS8R1BdVKowlzgIzDm",
    },
  ],
} as const satisfies Track
