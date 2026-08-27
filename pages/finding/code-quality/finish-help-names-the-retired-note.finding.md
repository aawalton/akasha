---
id: 62de029e-35e6-528f-abaa-2e424968359e
slug: finish-help-names-the-retired-note
page-type-slug: finding
title: "Finish help names the retired note"
domain-slug: domain/code-quality
---

# Claim

`ops project finish --help` says a run that stops partway "appends one `FINISH-INCOMPLETE:` entry to the project's notes". The same file writes a `finishFailure` attribute instead, and the notes-append it describes was retired. A seat reading the help looks for the record in `notes`, where nothing has been written since 2026-08-03.

# Evidence

Found while emptying `dirty/code/packages-alanwalton-projects-cli-claude.md`, whose own paragraph on `finish` describes the same retired mechanism. That paragraph is being cut as false; this string is live and stays.

The two halves are in one file, forty lines apart. `packages/alanwalton/projects/cli/src/project/finish.ts:40` is the help text quoted above. Lines 18-19 of the same file import `buildFinishFailureRecord` and `FINISH_FAILURE_ATTR`, and lines 215-216 write `propertyId: FINISH_FAILURE_ATTR` with `value: buildFinishFailureRecord({...})`.

`FINISH_FAILURE_ATTR` is `"finishFailure"`, declared at `packages/alanwalton/projects/cli/src/pure/build-finish-failure-record.ts:38`. That module's own header names the change at line 11: the record was a "`FINISH-INCOMPLETE:` entry appended to `notes`", past tense.

The retirement is `49cc06dcb6` (2026-08-03), "projects: move the row's prose to its document, and its records to fields", whose message says the three note records "become `backwardMove`, `ciCure` and `finishFailure` — parsed, queryable, replaced not appended". The sibling `move-to.ts` help was updated in that move and now names `backwardMove`; `finish.ts` was not.

What it costs is not tidiness. The new record is queryable and the old one was prose in a column, so a seat told to read `notes` finds an empty field rather than a wrong answer, and reads that as "the run recorded nothing" — which is what the record exists to deny.

This is the third stale `--help` in this package. `code-quality/commit-help-misplaces-the-quality-checks` and `code-quality/lint-verdict-help-misstates-its-default` already stand; I opened the first rather than trusting its name, and it is a different string, a different verb and a different cause. What the three share is that the help text is the surface a seat reads and the one nothing checks against the code beside it.
