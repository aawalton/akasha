---
id: 242d5567-2461-5d43-a4c8-efd203dc353d
slug: status-lists-hide-the-divergence
page-type-slug: finding
title: "Status lists hide the divergence"
domain-slug: domain/global
---

# Claim

`tools/checks/status-vocabulary.ts` prints two nineteen-item lists that differ at one position and leaves finding it to the stopped reader's eye. Naming the first divergent position would need a hole the check does not fill.

# Evidence

Observed by the dispatched `review-instructions` seat reading `refusals/project-status-misordered.md` on 2026-08-12, after rendering the body with all three holes filled from a real swapped checkout.

No line of the document reaches it: the change is to the check.

Not measured: whether a reader has ever had to do this by eye, and what the lists cost at their current length.
