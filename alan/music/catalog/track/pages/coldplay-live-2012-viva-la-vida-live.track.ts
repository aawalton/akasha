import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012VivaLaVidaLive = {
  id: "01a0b9ee-dac0-798b-b5fd-f93e7715d446",
  type: "page-type/track",
  slug: "coldplay-live-2012-viva-la-vida-live",
  ownLength: 4.972216666666666,
  ownProgress: 4.972216666666666,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Viva La Vida - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "vivalavidalive|4gzpq5DPGxSnKTe4SA8HAU|298333",
  song: "song/coldplay-viva-la-vida",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 9,
      externalId: "5ZV67iTfNpW3ueMCELLiSX",
      externalLink: "https://open.spotify.com/track/5ZV67iTfNpW3ueMCELLiSX",
    },
  ],
} as const satisfies Track
