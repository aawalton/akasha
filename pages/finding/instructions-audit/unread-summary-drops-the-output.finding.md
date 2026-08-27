---
id: 8e85200e-f1aa-521b-a4d0-bea5004745b0
page-type-slug: finding
title: "Unread summary drops the output"
domain-slug: domain/global
---

# Claim

On its unread-summary branch `tools/checks/suite-runs.ts` drops the runner's output entirely. The failed branch carries the failing-test lines through; this one pushes the refusal alone, so a reader is told no summary was printed and is never shown the line that was printed — the resolve error that is the one thing telling them what to fix.

# Evidence

Found by the dispatched `review-instructions` seat reading `refusals/suite-summary-unread.md` on 2026-08-12, which ran the check's summarising function over three shapes of runner output, including a resolve error at exit 1.

Repairing it is a change to the check rather than to the document, and what it should carry is a judgment about the instrument rather than something an instrument settles.

Not measured: how often this branch fires against how often the failed branch does.
