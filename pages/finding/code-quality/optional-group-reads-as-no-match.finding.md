---
id: 124b9158-5a37-5e79-8162-abbd2af374e0
page-type-slug: finding
title: "Optional group reads as no match"
domain-slug: domain/code-quality
---

# Claim

Neither `requireMatch` nor `requireMatchPositional` in `@shared/utils-narrow` can carry a regex with an optional capture group. An unmatched optional group leaves `undefined` in the exec array or on `groups`, both helpers' internal schemas reject it, and both re-throw as `no match for <re>` — a false statement about a valid input, raised before the caller's own schema runs, so the caller cannot correct it.

# Evidence

Recorded 2026-08-07 while ingesting `dirty/skills/code-quality/findings.md`, which carried it from `project-16696` on 2026-07-28. Re-read against live source rather than carried over.

THE POSITIONAL LEG. `packages/shared/utils/narrow/src/require-match-positional.ts:4` declares `RAW_MATCH_SCHEMA = z.array(z.string()).min(1)` and line 14 runs `RAW_MATCH_SCHEMA.parse(re.exec(input))` inside a `try`. An unmatched optional group puts `undefined` in the exec array, so `z.array(z.string())` rejects it. The `catch` throws `requireMatchPositional: no match for ${re}`. `schema.parse(raw.slice(1))` on the next line never runs.

THE NAMED LEG. `require-match.ts:8-11` declares `EXEC_GROUPS_SCHEMA`, whose transform runs `z.record(z.string(), z.string()).parse(v.groups ?? {})`. An unmatched named optional group is PRESENT on `groups` valued `undefined`, so the record schema rejects it. Line 27 parses inside a `try`; the `catch` throws `requireMatch: no match for ${re}`; `schema.parse(groups)` on line 33 never runs.

THE ERROR NAMES THE ONE THING THAT IS CORRECT. Both messages interpolate the regex, so a caller debugging a valid input is pointed at the pattern rather than at the helper's internal schema.

THE NAMED LEG IS THE HARDER ONE TO DEBUG. `JSON.stringify` omits properties valued `undefined`, so a printed `groups` object looks like a clean record with the optional key absent, while `in` shows the key present. A reader debugging from the printed object concludes the schema is wrong about a key that is not there.

FILED BESIDE, NOT FOLDED IN. `pages/finding/code-quality/require-match-comment-routes-past-sibling.finding.md` already stands on these helpers, but its claim is about the doc comment routing positional callers past a sibling. This one is about what the code does to a valid input, and neither implies the other.

NOT MEASURED. How many callers pass a regex with an optional group, and whether the fix is `z.array(z.string().optional())` or hoisting the parse out of the helpers' own `try`.
