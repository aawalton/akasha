/**
 * Specimen the properties-file-key-space scan must keep finding.
 *
 * `0 violations` reads identically whether the corpus is clean or the matcher
 * is dead, and this tree's real instances were corrected — so after that
 * correction a live green is the ONLY thing the gate can ever report. The
 * canary is what makes that green mean something.
 *
 * It pins BOTH directions in one equality, over both carriers. The positives
 * are the shapes the real help texts used and the doc comment the real defect
 * was found in; the negatives are the code shapes that occur 251 times in this
 * tree, and the comments that accurately describe one of them. A matcher that
 * stopped reading help drops entries; a matcher that drifted into an
 * identifier-naming rule adds them. Either way the expected set no longer
 * matches and the check refuses a verdict.
 *
 * Not scanned as corpus: `findFiles` drops `__fixtures__` via
 * `CHECK_EXEMPT_DIRS`, so this file is reachable only through the explicit
 * canary probe and is never counted as a violation.
 */

// ── Positives: help text, the claim a reader acts on ────────────────────────

export const DOUBLE_QUOTED_HELP =
  "`--properties-file` points to a JSON map `{ propertyId: value }` of domain properties"

export const SINGLE_QUOTED_FLAG_DESCRIPTION =
  'JSON file with a `{ propertyId: value }` object of properties ("-" = stdin)'

export const TEMPLATE_HELP = `Accepts arbitrary properties as a JSON map { propertyId: value }.`

export const BRACE_TIGHT_HELP = "a {propertyId: value} map, written without spaces"

export const CLAIM_ON_A_LATER_LINE =
  "this literal opens on one line\n" +
  "and states `{ propertyId: value }` on another, so the reported line must be the claim's"

// Help states the claim OPEN as readily as closed, and the string arm reads it
// that way. A matcher demanding a closing brace HERE would stop reading half
// the carrier this gate was built for, so this entry is what forbids unifying
// the two arms on the comment arm's narrower form.
export const UNCLOSED_IN_HELP = "the map is `{ propertyId: …` and the value is anything JSON-shaped"

// ── Positives: comments, the carrier the real defect was found in ───────────

/** Inbound `{ propertyId: value }` map, stored verbatim. */
export const DOC_COMMENT_OVER_A_FIELD = "the shape the entity-surface update verb really carried"

// A line comment states it just as plainly: `{ propertyId: value }`.
export const LINE_COMMENT_CLAIM = "a claim a reader acts on counts from either carrier"

// ── Negatives: code, which this scan may never see ──────────────────────────

export interface PropsRecord {
  props: ReadonlyArray<{ propertyId: string; value: unknown }>
}

export const CODE_OBJECT_LITERAL: PropsRecord = {
  props: [{ propertyId: "status", value: "done" }],
}

export function interpolationReadsTheField(p: { propertyId: string }): string {
  return `property ${p.propertyId} value is not JSON-shaped`
}

export const RECORD_SHAPE_HAS_NO_COLON =
  "Patch raw `{ propertyId, value }` props onto a page by seq"

export const CANONICAL_SPELLING = "JSON map `{ propertySlug: value }` — slug keys, stored verbatim"

// ── Negatives: comments describing a record rather than a key space ─────────

// The shape a collection embed forwards, parsed into
// `{ propertyId: "story", operator: "equals", value }` — a record whose field
// carries this name, which is an accurate sentence rather than a claim about
// what keys a properties file takes.
export const RELATION_FILTER_COMMENT = "comments of this shape stand in shared/pages-ui"

/** A brace this comment never closes — `{ propertyId: … and then more prose. */
export const UNCLOSED_IN_A_COMMENT = "named in KEY_SPACE_SCAN_BOUND as what the closed form costs"
