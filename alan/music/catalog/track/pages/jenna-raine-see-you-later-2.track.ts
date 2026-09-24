import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineSeeYouLater2 = {
  id: "01a0c621-23bf-76b4-a51b-991093ee3cd9",
  type: "page-type/track",
  slug: "jenna-raine-see-you-later-2",
  ownLength: 3.4623333333333335,
  ownProgress: 3.4623333333333335,
  partOfCollections: ["release/jenna-raine-see-you-later"],
  status: "completed",
  unit: "unit/minutes",
  title: "2%",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jenna-raine" }],
  trackKey: "2|3aHe9rMa5HFTjXHw8tEz0A|207740",
  song: "song/jenna-raine-2",
  carriedBy: [
    {
      release: "release/jenna-raine-see-you-later",
      discNumber: 1,
      position: 3,
      externalId: "4fV8zuE5GmRCjzl8b3JUgg",
      externalLink: "https://open.spotify.com/track/4fV8zuE5GmRCjzl8b3JUgg",
    },
  ],
} as const satisfies Track
