---
id: ecd0d4a0-c5d3-5596-b519-6bb73b3232f3
slug: one-point-means-different-work
page-type-slug: finding
title: "One point means different work"
domain-slug: domain/alanwalton-app
---

# Claim

One point in the project-completions faucet does not mean the same thing between two personas, and one shared bar of 4 is applied as though it does. The pass meters every Done project in scope, a parent and each of its children alike. Across the ten personas on that bar the child fraction runs from 0% (Thea, 70 roots of 70) to 100% (Olwen, 0 roots of 7). Half of Athena's 954 are children, 475 of them under another of her own metered projects. Nothing reports it; every total is a correct count.

# Evidence

Measured 2026-08-07 emptying `dirty/skills/persona-craft/economy-decisions-wealth-completions.md` and its sibling, which record a review that measured this and approved a parents-only recount. It was never built: `packages/alanwalton/daily-tracking/src/completion-points.ts` contains no reference to a parent, its `where` builders being `status = done` plus an optional `owner`.

Method. Per persona, `ops page list --type project --all --json --properties id,parentKey` filtered on `status = done` and her `owner` slug; then count rows carrying a `parentKey`, and how many of those parents sit in her own Done set.

    persona   total  roots  children  child-of-own-done
    athena      954    477       477                475
    ember       285     48       237                168
    astra       279    186        93                 80
    dalla       248    234        14                 10
    awen        111     97        14                 14
    thea         70     70         0                  0
    ryn          63     62         1                  1
    nimue        28     22         6                  2
    olwen         7      0         7                  0
    atlas         5      4         1                  0

Every total equals her stored `totalPoints`, so the faucet writes exactly this count. All ten carry `greenDayPoints = 4` except Ryn at 8.

The spread is the observation. Thea's seventy points are seventy root deliverables; Olwen's seven are children of one parent she still owns at `someday_maybe`. Both are scored against four a day. Nothing detects it: each total is an honest count of rows matching an honest filter, and a persona who decomposes finely is indistinguishable from one shipping more.

Not established: whether counting a parent and its children both is wrong. A finding is an observation before anyone has judged what it means, and that judgment is Alan's. The quarantined review records him approving a recount, but it is untrusted and queued for removal — which is why this is filed here rather than left to go with it.
