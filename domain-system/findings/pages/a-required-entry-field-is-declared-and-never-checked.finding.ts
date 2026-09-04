import type { Finding } from "../finding.page-type.ts"

export const aRequiredEntryFieldIsDeclaredAndNeverChecked = {
  id: "01a05ffa-53e0-7008-a557-f6eea422cd18",
  pageTypeSlug: "finding",
  slug: "a-required-entry-field-is-declared-and-never-checked",
  domainSlug: "workspace-package/checks",
  claim:
    "An entry shape declares which of its fields are required, and nothing ever asks. What judges an entry reads the keys a row states and asks whether the shape declares each one. Nothing reads the other way, so a row missing a field its shape requires is answered clean. Temper has just landed 20,956 entry rows against shapes declaring required fields, and no row was tested for a field left out.",
  evidence:
    'Read on 2026-09-01 in akasha/checks/code-checks/pages/page-matches-its-type/page-matches-its-type.code-check.code.ts. `fieldsOf` at :100 opens `for (const [inner, stated] of Object.entries(entry))`, so every judgment it makes hangs off a key the row states, and a field the shape declares and the row omits is never reached. The function\'s whole body is that one loop, and `entryReasonsIn` at :167-171 calls it once per row and adds only the missing-id check beside it. The page half of the same check does what the entry half does not: :189-194 iterates `declared` and pushes `does not state X, which Y requires` for each required property absent from the page. So the two halves of one check disagree on whether absence is judged. The value is parsed and carried the whole way: `carriedFrom` in pages/page-type-properties reads `required: one["required"] === true` for every field of an entry shape and puts it on `Carried.required`, which the entry path then reads nowhere. `page-property-entry` states the invariant `Every entry is judged against the fields its shape declares`, which holds for the fields a row states and fails for the fields a row leaves out. Widening this makes a check refuse more than it does, which Alan Approves Checks reserves to Alan, so it is filed rather than mended.',
} as const satisfies Finding
