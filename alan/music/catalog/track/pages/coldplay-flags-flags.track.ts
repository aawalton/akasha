import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayFlagsFlags = {
  id: "01a0b9ee-f0a3-7c50-9689-05fa38c665de",
  type: "page-type/track",
  slug: "coldplay-flags-flags",
  ownLength: 3.608216666666667,
  ownProgress: 3.608216666666667,
  partOfCollections: ["release/coldplay-flags"],
  status: "completed",
  unit: "unit/minutes",
  title: "Flags",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "flags|4gzpq5DPGxSnKTe4SA8HAU|216493",
  song: "song/coldplay-flags",
  carriedBy: [
    {
      release: "release/coldplay-flags",
      discNumber: 1,
      position: 1,
      externalId: "2RZ8SjEJYJHZ8YCUzls77w",
      externalLink: "https://open.spotify.com/track/2RZ8SjEJYJHZ8YCUzls77w",
    },
  ],
} as const satisfies Track
