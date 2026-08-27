---
id: 286386d1-b7fe-5ddf-8535-1c4c650cef76
page-type-slug: finding
title: "Owner fault routes on count first"
domain-slug: domain/domain-championing
---

# Claim

`domain-edges.ts` routes on parent count before owner membership, so a one-parent document whose `domain-owner:` names something else is always told the key is redundant and never that the owner is not a parent — and the two bodies want different acts.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/domain-owner-redundant.md` dispatched from `review-documents`. The reading raised it and judged the settlement a behaviour change to an audit; the source was read here.

`tools/checks/domain-edges.ts` branches `if (parents.length === 1)` to `domain-owner-redundant`, and only `else if (!parents.includes(owner))` to `domain-owner-not-a-parent`. So the second body is unreachable for a one-parent document whatever its owner names.

The two want different acts. Redundant says drop the key. Not-a-parent says fix the slug or declare the parent.

The check's own header argues the second way, at the passage explaining why it carries fourteen bodies rather than twelve: "each end of the ownership pair fails two ways that want different acts… Written as one body with the other end's answer held in a hole, the reader is handed a fault and no remedy."

The same reading repaired the redundant body for two false claims — it had said such a key is "that parent written twice" and that "nothing reads the second", where `ownerOf` at `tools/lib/domain.ts:166` reads the key in preference and falls back to the sole parent only where it is absent. A fixture naming sole parent `global` and `domain-owner: code` printed the body telling the reader `code` was `global`. The landed body is true under either settlement.

Settling it means reordering the two tests and adding a case `tools/tests/domain-edges.test.ts` does not have.

Not measured: whether any live document is in this state today, or whether the mirror fault at the other end of the pair routes the same way.
