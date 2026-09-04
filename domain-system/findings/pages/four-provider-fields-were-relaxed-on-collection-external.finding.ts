import type { Finding } from "../finding.page-type.ts"

export const fourProviderFieldsWereRelaxedOnCollectionExternal = {
  id: "01a0657f-1a2c-7003-a7c2-1e5b93f6d840",
  pageTypeSlug: "finding",
  slug: "four-provider-fields-were-relaxed-on-collection-external",
  domainSlug: "domain/akasha-migration",
  claim:
    "The four fields a collection external required are now optional, and the providers it may name are five rather than one, both landed directly under the migration's released approvals.",
  evidence:
    "`collection-external` required external-id, external-link, source and last-synced-at. Not one of the 1,123 great courses states a last-synced-at, one of the 14 subjects states no external-id, and only one of the three collections states a last-synced-at. " +
    "Held strict, the page type fitted almost nothing it was written for. The four were relaxed to optional and two invariants added saying what an absent one means. " +
    '`Source` was the literal "musicbrainz". The providers the whole repository\'s collection pages actually name were counted rather than guessed: kindle 1185, the-great-courses 1140, tmdb 161, the-wandering-inn 1, and musicbrainz. The union now names all five. ' +
    "Widening a union only admits more, so nothing that landed before stops landing, and the music lane is untouched. " +
    "`own-length` and `own-progress` were added to `collection` alongside, which its `unit-slug` had already anticipated by being defined as what a collection's own lengths are counted in.",
} as const satisfies Finding
