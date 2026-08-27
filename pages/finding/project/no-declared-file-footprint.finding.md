---
id: 8ff02c60-fbb9-5a30-835a-36a8f447a38f
slug: no-declared-file-footprint
page-type-slug: finding
title: "No declared file footprint"
domain-slug: barred-meaning/project
---

# Claim

A project row cannot declare which files it will touch. The `changedFiles` property exists on the page type and nothing writes it; the same name in the CLI is a local diff for pipelines that never reaches the row. A footprint is stated nowhere and derivable only after work lands.

# Evidence

Measured 2026-08-02.

`changedFiles` is a declared `json` property on the project page type (`ops project update` names it among the valid keys). Sampled on 13 rows across every lifecycle state — 17435, 17438, 17443, 17452, 17460, 17478, 17479, 17492, 17497, 17517, 17523, 17525 and 17526 — it is empty on all of them. That reading is safe rather than a projection artifact: `project/show.ts:35` states a verbose json field with stored content is replaced by the placeholder `<omitted: load via --properties=<key> if needed>`, so a field that comes back truly absent holds nothing. The opposite reading is the mistake `findings/project-path/row-cannot-declare-its-path.md` records.

Every `changedFiles` in the code is a different thing wearing the name. `move-to-pipeline.ts:174` builds it as a local from `reading.files` and passes it to `trigger_pipeline` at `:284`; `move-to-addons.ts:155` splits a git diff into one to decide addon rebuilds. Both are derived from a diff that exists only once there are commits, and neither reads or writes the row property. Nothing in `packages/` writes it as a page property at all.

The gap is between derived and declared. A diff says what a landed row touched; nothing says what an open row intends to touch, which is the only form a reader could use before the work exists.

**Why this was filed, which is a use it would serve rather than the reason it is true.** #17525 declined to have its row-recording verb validate a `project-seqs:` value against the live `ops` CLI. The refusal it wanted to make is that a row named by a finding is one that would actually resolve that finding — which needs a declared footprint, not a landed diff. Alan has said a project file footprint is planned; when it lands, that refusal becomes answerable from the corpus side and #17525's decision is worth revisiting.

Not measured: whether any row anywhere has ever carried a value, only that none of the 13 sampled does.
