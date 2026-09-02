import type { Finding } from "../finding.page-type.ts"

export const theNewSongAndArtistTypesCarryNoTitle = {
  id: "01a0626c-330b-7000-892e-2844e4add6ba",
  pageTypeSlug: "finding",
  slug: "the-new-song-and-artist-types-carry-no-title",
  domainSlug: "domain/music-catalog",
  claim:
    "A song's title and an artist's name reach the new page types only as a slug, so the punctuation, the casing and the non-Latin letters MusicBrainz gave are lost.",
  evidence:
    "`akasha/alan/music/catalog/songs/song.page-type.ts` declares sixteen properties and `artists/artist.page-type.ts` declares eight; neither declares a title or a name, and `page.page-type.ts` gives them only `id`, `page-type-slug`, `slug` and `cover`. The old mappers in `collections/music/src/musicbrainz/map.ts` emitted `title` from all three of `mbArtistToProps`, `mbWorkToSongProps` and `mbRecordingToSongProps`, and the 1,656 song pages in `pages/music-song` carry it today. The recreated mappers landed at `akasha/alan/music/catalog/musicbrainz-map/` drop the key rather than invent a property, and the title reaches the page only through `slugifyName`, which lowercases, folds diacritics off letters, turns every run of other characters into one dash, and answers `untitled` for a name holding no Latin letter and no digit. So `Sigur Rós` becomes `sigur-ros`, `99 Problems (Live)` becomes `99-problems-live`, and a Japanese title becomes `untitled`. Two songs of one artist whose titles slug alike are told apart by a number rather than by their titles. Nothing reads a title back out of a slug.",
} as const satisfies Finding
