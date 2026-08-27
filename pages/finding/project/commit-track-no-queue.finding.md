---
id: d3325ba8-fb27-5d86-958b-52864606a751
slug: commit-track-no-queue
page-type-slug: finding
title: "Commit track no queue"
domain-slug: barred-meaning/project
---

# Claim

A commit-track project holding code-repository content has no route through the merge queue, because the only verb that enqueues sits on the deploy ladder the row is not on.

# Evidence

Met on #18284 on 2026-08-10, a row landing four render-reference images in the code repository. It declares `live-on: commit`, so its ladder is the commit-stage one.

`ops project move-to --status deployment` refuses that row: the deploy rungs name acts a commit-track project cannot perform. `ops project deploy` is the only verb that enqueues anything onto the merge queue, and it belongs to those same rungs. So the row cannot reach the queue by any legal move, and the commit itself is the whole of its landing.

What the seat did instead was check by hand what the queue would have checked: a dry run showing a clean fast-forward `2ecc24a0c0..1a7bedd03d`, branch CI green at 29 of 29 on exactly that SHA, the queue idle with nothing queued or batched and its active batch terminal, and main still on the commit the branch was cut from. Nothing was raced. That is a careful seat substituting for a gate, which is the state worth naming: the same content pushed by a less careful one lands identically and reports the same success.

The refusal is deterministic, so every future commit-track row carrying code-repo content meets it the same way. The two readings the evidence cannot separate are whether such rows should gain a queue route, or whether code-repo content should never be commit-track — and that is a lifecycle decision rather than something a seat holding one row can settle.
