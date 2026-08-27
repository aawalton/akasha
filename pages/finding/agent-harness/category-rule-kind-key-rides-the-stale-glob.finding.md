---
page-type-slug: finding
id: ab6d4e42-ade9-5027-8811-124a70d13e13
slug: category-rule-kind-key-rides-the-stale-glob
title: "Category rule kind key rides the stale glob"
domain-slug: domain/agent-harness
---

# Claim

Correcting the stale `files:` glob on `page-types/category-rule-code.md` and `page-types/category-rule-agent.md` breaks the category rules engine, because `kindOf` derives the kind key from that glob's path.

# Evidence

Both page types still declare `files: instructions:monarch/category-rules/{code,agent}/*.md` and the matching `instructions-path:`, while `page-types/rule-sets/category-rule.md` already carries `path-pattern: ^pages/category-rule-(?<kind>agent|code)/...`. The rules still load, by two mechanisms in `tools/lib/rules-engine-corpus.ts` pulling in opposite directions.

`standingGlob` scans the declared glob, finds nothing at the old location, and falls back to `placeOf(slug)`, which answers `pages/category-rule-code/**/*.md`. So the corpus is read from the new place.

`kindOf` takes the second-to-last segment of the *declared* glob, so `monarch/category-rules/code/*.md` yields the key `code`. `globsOf` keys the rule set by that, and `category-rule-set.ts` then calls `globFor(globs, "code", CORPUS)` and `globFor(globs, "agent", CORPUS)` by those literal names.

Correcting `files:` to `instructions:pages/category-rule-code/*.md` makes `kindOf` answer `category-rule-code` instead, so the key `code` is never set and `globFor` finds nothing under the name it asks for. The stale declaration is load-bearing: it is the only remaining thing spelling the kind.

Three other references to the old location survive and are not load-bearing: `RULE_FOLDER` in `tools/lib/category-rule.ts`, which prints into the `category-transaction-unclaimed` and `category-transaction-space-unbounded` refusals and now points a reader at a directory holding no rules; `monarch/propose.ts`; and `domains/tasks/category-rule/change-category-rules.md`, which tells an agent to read the rules across two directories that are now empty.

`monarch/category-rules/code/` and `.../agent/` also stand on disk as empty directories, untracked because git keeps no empty directory. A single `.md` landing in either flips `standingGlob` back to the declared glob and splits the rule set across both locations with nothing reporting it.
