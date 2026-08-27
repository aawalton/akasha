---
id: cb35dc4a-6717-513f-a4fb-e715417d3030
slug: rules-push-writes-unparsed
page-type-slug: finding
title: "Rules push writes unparsed"
domain-slug: domain/alanwalton-app
---

# Claim

`ops email rules push` writes the local file into the live `email-rule-set` page before parsing it, and its help says the parsed count it then prints means "a malformed table is caught at push time". Nothing is caught. A row the parser rejects is dropped in silence and the file is already the live rule set that `ops email resolve` and the new-mail watcher decide against.

# Evidence

`packages/alanwalton/email/google/src/email/rules-push.ts` runs `await writeRules(sb, contents)` — the upsert onto the singleton `email-rule-set` row — and only afterwards computes `parseEmailRules(contents).length` for the `parsedRules` field it prints. Its own `help.description` reads: "Prints a confirmation plus the parsed rule count so a malformed table is caught at push time."

`parseEmailRules` in `packages/alanwalton/email/resolver/src/parse-rules.ts` drops a row with a bare `continue` on five separate conditions — fewer than five cells, an unrecognised status token, an unknown action token, a `subjectRegex` that fails `compilesAsRegex`, and a `RuleRowZ.safeParse` failure, the last covering both `.refine()` invariants. None of them writes to stderr, throws, or is counted. A whole table is skipped where its header row's first two cells are not `id` and `from`.

So the only signal a rule was lost is `parsedRules` being lower than the operator expected, which requires them to already know the right number. The dropping itself is a deliberate robustness choice the parser's header comment defends — "a single bad edit never wedges the resolver" — and that choice is not in question here. What the help promises is that the push command catches the malformed table; the ordering means the malformed table is live before the count is computed, and the count is not compared against anything.

Read at `~/code` on 2026-08-07 while ingesting `dirty/knowledge/email-verb-surface.md`, which did not record this.
