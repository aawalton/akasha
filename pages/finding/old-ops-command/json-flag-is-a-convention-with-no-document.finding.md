---
id: a6ec450d-3d9b-5f1c-bd36-23e5226ef8d0
slug: json-flag-is-a-convention-with-no-document
page-type-slug: finding
title: "JSON flag is a convention with no document"
domain-slug: page-type/old-ops-command
---

# Claim

544 of 717 command files offer `--json`, nothing states when a verb owes one, and inside a single namespace two verbs printing the identical row shape disagree about it.

# Evidence

Measured 2026-08-15, running `review-command` on `ops ali coverage`.

`grep -rl '"--json"' tools/commands/` matches 544 of the 717 command files. No document under `domains/`, `page-types/` or `properties/` mentions `--json` at all, so a verb's author has nothing to consult and 173 files went the other way.

The `ali` namespace shows what that costs at close range. `ops ali next-unscored` and `ops ali random-leaf` both print `path<TAB>label<TAB>status`, built from the same `Leaf` type in `tools/lib/book-of-everything-random-leaf-select.ts`, and `random-leaf`'s own help names `next-unscored` as its sibling. `next-unscored` offers `--json` and emits `{path,label,status}`. `random-leaf` offers no such flag. A caller who scripts one cannot script the other the same way, and nothing about either verb explains the difference.

`ops ali coverage` and `ops ali pending` both offer it. The two verbs that write — `fold` and `seed` — do not, which is the line one would expect the convention to fall on, except that `random-leaf` reads and still has none.

Not measured: how many of the 173 files without `--json` are interventions, where the flag would carry nothing, as against reports where its absence is the gap this finding names.
