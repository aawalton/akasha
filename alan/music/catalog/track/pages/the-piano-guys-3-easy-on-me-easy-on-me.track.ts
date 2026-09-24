import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3EasyOnMeEasyOnMe = {
  id: "01a0afa2-00dd-7101-9b65-80db07e629f0",
  type: "page-type/track",
  slug: "the-piano-guys-3-easy-on-me-easy-on-me",
  ownLength: 2.9859,
  ownProgress: 2.9859,
  partOfCollections: [
    "release/the-piano-guys-3-easy-on-me",
    "release/the-piano-guys-3-unstoppable-2",
    "release/the-piano-guys-piano-focus",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Easy On Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "easyonme|0jW6R8CVyVohuUJVcuweDI|179154",
  song: "song/the-piano-guys-easy-on-me",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-easy-on-me",
      discNumber: 1,
      position: 1,
      externalId: "1ndm9V7DmeI3kOOMwaCMzk",
      externalLink: "https://open.spotify.com/track/1ndm9V7DmeI3kOOMwaCMzk",
    },
    {
      release: "release/the-piano-guys-3-unstoppable-2",
      discNumber: 1,
      position: 6,
      externalId: "3gXgHus2I2Z2LzUgISqCap",
      externalLink: "https://open.spotify.com/track/3gXgHus2I2Z2LzUgISqCap",
    },
    {
      release: "release/the-piano-guys-piano-focus",
      discNumber: 1,
      position: 8,
      externalId: "1Acs6mGwPJhv8aiIbZvs6t",
      externalLink: "https://open.spotify.com/track/1Acs6mGwPJhv8aiIbZvs6t",
    },
  ],
} as const satisfies Track
