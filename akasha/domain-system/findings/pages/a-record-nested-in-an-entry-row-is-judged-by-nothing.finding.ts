import type { Finding } from "../finding.page-type.ts"

export const aRecordNestedInAnEntryRowIsJudgedByNothing = {
  id: "01a05ffa-53e2-7eca-8b07-93742ab29357",
  pageTypeSlug: "finding",
  slug: "a-record-nested-in-an-entry-row-is-judged-by-nothing",
  domainSlug: "workspace-package/checks",
  claim:
    "A field of an entry row may itself be a record, and what that record holds is judged by nothing. The two measures a field gets both act on text alone and hand anything else back unmeasured. A record nested in a row is therefore declared by a shape, written into the commit, and tested by no check at all.",
  evidence:
    'Read on 2026-09-01 in akasha/checks/code-checks/pages/page-matches-its-type/page-matches-its-type.code-check.code.ts. `fieldsOf` at :126-133 ends by running `overMax` and `offFormat` over each value a field carries, and both open by handing back null for anything that is not text: `overMax` at :47 tests `typeof said !== "string"`, `offFormat` at :55 the same. A value that is an object falls through both and no third measure follows, so the loop closes having judged nothing. `fieldsOf` never calls itself, so nesting is read at no depth. The live case is temper-set: akasha/temper/temper-catalog/temper-gear/sets/pages/abyssal-brace/abyssal-brace.temper-set.bonuses.jsonl carries rows shaped `{id, count, status, description, effects: [{metricId, type, value}]}`, where `effects` is a record declared inside the `bonuses` entry shape. `count`, `status` and `description` are judged. Every `metricId`, `type` and `value` inside `effects` is not, across all 707 sets and 2,463 bonus rows. The keys of a nested record are unjudged too, so a misspelt one lands as readily as a right one — which is the same trap that let entry keys land in kebab and refuse only at audit. Widening this makes a check refuse more than it does, which Alan Approves Checks reserves to Alan, so it is filed rather than mended.',
} as const satisfies Finding
