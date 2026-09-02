import type { Finding } from "../finding.page-type.ts"

export const aSetIndexPastTheTableIsReadAsTheSentinelNotRefused = {
  id: "01a060f0-3eb6-7895-9587-e1c4e3f65449",
  pageTypeSlug: "finding",
  slug: "a-set-index-past-the-table-is-read-as-the-sentinel-not-refused",
  domainSlug: "domain/temper",
  claim:
    "SET_BITS is 10, so a build hash can name a set index from 707 to 1023, and getSetId answers no-set for every one of them. The route brands a URL path segment as a build hash with no validation, so whoever holds the link chooses the bytes. An index naming no row is read as the sentinel rather than refused. None of this was introduced by this initiative.",
  evidence:
    "build-codec-indices.ts line 88 defines bitsNeeded as Math.ceil(Math.log2(count)), so 707 sets take 10 bits and the indices 707 through 1023 are representable while naming no row. getSetId at line 346 answers setIds[index] ?? requireFirst(setIds), and requireFirst answers index 0, which the generator sorts to no-set. Nothing throws and nothing refuses, so a build decodes with gear the sender never named.\n\ntemper/web/app/routes/character.h.$hash.tsx lines 10 to 18 read params.hash off the URL, brand it with buildHash(hash) and hand it to importCharacterFromHash. A brand is a cast, so no validation runs between the path segment and the decoder.\n\nThe capture addon coerces the same way. game-characters-capture-addon/src/generated/set-mappings.generated.ts line 1429 answers SET_ESO_ID_TO_INDEX[esoSetId] ?? 0, so a set its table does not know is captured as no set rather than flagged, and CHARACTER_SET_BITS is 10 in codec-constants.generated.ts line 63.\n\nThe mend is a refusal rather than a clamp: getSetId answering undefined for an index past the table, and validation at the route boundary ahead of buildHash. Neither was done here. Web keeps to temper for this initiative, and changing what the decoder does with a bad index is a larger call than a migration. Narrowing SetsAllId to a union changed the type of what getSetId answers and changed none of this behaviour.",
} as const satisfies Finding
