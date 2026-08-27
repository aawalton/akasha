---
id: e3a5ab56-0595-5a2e-b918-7541a4282629
page-type-slug: finding
title: "Parking note miscounts children"
domain-slug: barred-meaning/project
---

# Claim

The rebuild sweep's parking note states a row's child count from a read that did not load the relation, so a note on a row carrying four children asserts it has none — and that note is the row's own resume instruction.

# Evidence

Measured 2026-08-02 from `~/code` by the lead seat on alan-harness, while resuming rows the sweep had parked.

`ops project show 17052` returns a `children` array of four: 17053, 17054, 17055 and 17056. The note appended to that same row at `2026-08-02T14:08:37.595Z` by `athena-lead` reads: "reached `awaiting_lead_definition` and was last touched 2026-07-29. Its home key reads `amy`. **It has no children.**"

Three of those four children were parked to `someday_maybe` by the same sweep and carry parking notes of their own; the fourth, 17053, is `done`. Resuming the parent on the note's account alone restores a tree whose remaining work stays parked and invisible to the dispatch queue — the outcome the note exists to prevent, since its stated purpose is that "whatever the row already carries is untouched and is still the best account of it that exists."

A probable mechanism is quoted by the tooling itself. `ops project show --properties notes` closes with: "An unrequested relation field (parentId/dependsOn/children) reads as absent here, NOT as null — name it in `--properties`." A generator projecting a narrow property set would read absent and render it as none.

Not measured: only 17052 was compared against its own note. How many of the sweep's notes carry the same claim, and how many of those sit on rows with children, was not counted. The mechanism above is inferred from the projection warning; the generator's source was not read.
