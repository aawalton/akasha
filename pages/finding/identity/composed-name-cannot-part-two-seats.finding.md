---
id: 44ebb92c-6a47-5805-8372-c322bfeb52d8
page-type-slug: finding
title: "Composed name cannot part two seats"
domain-slug: barred-meaning/identity
---

# Claim

A seat's composed name cannot tell apart two seats of the same persona, domain and role working different subjects, because `--seq` is the only distinguishing axis and work not cut as a row carries no seq.

# Evidence

`ops seat start --help` states the composition rule: `{persona}-{domain}-{role}-{seq}`, and says of `--seq` that it is "the only thing telling two seats of one domain and role apart." It also states that `--name` "given ALONGSIDE axes that compose a name, it must equal what they compose or the spawn is refused."

Observed on 2026-08-05 dispatching two `review-check` seats, one per specimen, per `tasks/general/define-task.md` stage 7 ("Spawn seats that did not write the task, one per case, each pinned to it"):

    ops seat start --persona claude --domain check --role researcher \
      --task review-check --name claude-check-researcher-astgrep

    refused: --name 'claude-check-researcher-astgrep' disagrees with the identity
    stated beside it, which spells 'claude-check-researcher'. A seat's name IS its
    identity (domains/identity.md), so the two cannot both be true of one seat.

A check review is not cut as a row — it ends in a recommendation to the lead, per `review-check` stage 6 — so neither seat had a seq to take. The two axes left that could differ are domain and role, and both seats hold the same values of each honestly.

The workaround taken was to spell one seat `--domain code-check` and the other `--domain check`. Both slugs are true of both specimens, so the split records nothing about which seat is reviewing which check, and a reader of `ops seat list` cannot tell them apart by anything but their start times.

The same shape reaches any task dispatched one-per-case without a row behind it. `review-check` is one; `define-principle-or-rule` run over two candidates at once would be another, and on 2026-08-05 two of those were spawned and separated only because their domains genuinely differed.
