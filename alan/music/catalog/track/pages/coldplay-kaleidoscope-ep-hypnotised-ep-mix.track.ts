import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpHypnotisedEpMix = {
  id: "01a0b9ee-f239-794e-8587-05836eadd70b",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-hypnotised-ep-mix",
  ownLength: 6.52355,
  ownProgress: 6.52355,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hypnotised - EP Mix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "hypnotisedepmix|4gzpq5DPGxSnKTe4SA8HAU|391413",
  song: "song/coldplay-hypnotised",
  carriedBy: [
    {
      release: "release/coldplay-kaleidoscope-ep",
      discNumber: 1,
      position: 5,
      externalId: "7HBnZdg7fIQwqMhQhci0VV",
      externalLink: "https://open.spotify.com/track/7HBnZdg7fIQwqMhQhci0VV",
    },
  ],
} as const satisfies Track
