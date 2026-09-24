import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillGrowAsWeGo = {
  id: "01a0afa1-e1e7-76d5-9702-540721f1b059",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-grow-as-we-go",
  ownLength: 4.3148,
  ownProgress: 4.3148,
  partOfCollections: ["release/the-piano-guys-3-chill", "release/the-piano-guys-autumn-on-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Grow As We Go",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/the-piano-guys" },
    { artistName: "Sarah Schmidt" },
    { artistName: "Lucy Nelson" },
  ],
  trackKey:
    "growaswego|0jW6R8CVyVohuUJVcuweDI,0rNPZyO8TwKKCnysRUzksl,2LpGg3qukmprl5BSlBk6HM|258888",
  song: "song/the-piano-guys-grow-as-we-go",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-chill",
      discNumber: 1,
      position: 12,
      externalId: "631NzqPL2I4XHsK76E9390",
      externalLink: "https://open.spotify.com/track/631NzqPL2I4XHsK76E9390",
    },
    {
      release: "release/the-piano-guys-autumn-on-piano",
      discNumber: 1,
      position: 2,
      externalId: "78oxoexZ4dj7KfbTbEhw1M",
      externalLink: "https://open.spotify.com/track/78oxoexZ4dj7KfbTbEhw1M",
    },
  ],
} as const satisfies Track
