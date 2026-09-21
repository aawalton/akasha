import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineOnlyStartedGrowingRoses = {
  id: "01a0c621-1c74-780d-a177-ff96fc80aa7b",
  type: "page-type/track",
  slug: "jenna-raine-only-started-growing-roses",
  ownLength: 3.1755666666666666,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-only-started-growing", "release/jenna-raine-roses"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Roses",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "roses|3aHe9rMa5HFTjXHw8tEz0A|190534",
  song: "song/jenna-raine-roses",
  carriedBy: [
    {
      release: "release/jenna-raine-only-started-growing",
      discNumber: 1,
      position: 1,
      externalId: "4sXzcnTsq3iySRD8YqnYhN",
      externalLink: "https://open.spotify.com/track/4sXzcnTsq3iySRD8YqnYhN",
    },
    {
      release: "release/jenna-raine-roses",
      discNumber: 1,
      position: 1,
      externalId: "6fqbblMIytVYfUn8ra4bdV",
      externalLink: "https://open.spotify.com/track/6fqbblMIytVYfUn8ra4bdV",
    },
  ],
} as const satisfies Track
