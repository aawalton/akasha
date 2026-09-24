import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2SongsFromTheHeartTheCoastOfGalicia = {
  id: "01a0abea-7348-7ad1-a53f-99bb35876517",
  type: "page-type/track",
  slug: "celtic-woman-2-songs-from-the-heart-the-coast-of-galicia",
  ownLength: 3.6351,
  ownProgress: 3.6351,
  partOfCollections: ["release/celtic-woman-2-songs-from-the-heart"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Coast Of Galiçia",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "thecoastofgalicia|6NWtt9pNOL2Gx7kBykdE5x|218106",
  song: "song/celtic-woman-the-coast-of-galicia",
  carriedBy: [
    {
      release: "release/celtic-woman-2-songs-from-the-heart",
      discNumber: 1,
      position: 7,
      externalId: "34weuuOJ49Y1EgSGO5AYBo",
      externalLink: "https://open.spotify.com/track/34weuuOJ49Y1EgSGO5AYBo",
    },
  ],
} as const satisfies Track
