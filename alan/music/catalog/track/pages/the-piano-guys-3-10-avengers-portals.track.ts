import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310AvengersPortals = {
  id: "01a0afa2-0b5a-7704-8bc1-1225ebaafee7",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-avengers-portals",
  ownLength: 2.95,
  ownProgress: 2.95,
  partOfCollections: [
    "release/the-piano-guys-3-10",
    "release/the-piano-guys-3-avengers-portals",
    "release/the-piano-guys-3-classical-movie-soundtracks",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Avengers/Portals",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "avengersportals|0jW6R8CVyVohuUJVcuweDI|177000",
  song: "song/the-piano-guys-avengers-portals",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 9,
      externalId: "1ilWVkgfVdfpdSccLSQ0QQ",
      externalLink: "https://open.spotify.com/track/1ilWVkgfVdfpdSccLSQ0QQ",
    },
    {
      release: "release/the-piano-guys-3-avengers-portals",
      discNumber: 1,
      position: 1,
      externalId: "2mJ5eyF4dXoo4t5QghoIQr",
      externalLink: "https://open.spotify.com/track/2mJ5eyF4dXoo4t5QghoIQr",
    },
    {
      release: "release/the-piano-guys-3-classical-movie-soundtracks",
      discNumber: 1,
      position: 1,
      externalId: "0etevsX5XoKxi34X7dYHJN",
      externalLink: "https://open.spotify.com/track/0etevsX5XoKxi34X7dYHJN",
    },
  ],
} as const satisfies Track
