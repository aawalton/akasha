---
id: 3b39f94a-0601-599c-b12c-cb80c730aa6c
page-type-slug: finding
title: "Move bullets restate the stage head"
domain-slug: domain/global
---

# Claim

Every stage of `build-parent-deploy` opens with a `Move` bullet whose only content is the status already named in the stage head above it. Each status is stated twice, and a reader pays for eight near-identical lines at boot. One line would carry the same instruction. The same shape stands across the six project task documents, so collapsing it here alone would leave the family inconsistent.

# Evidence

Raised by the review-instructions reading of 2026-08-07, which judged 46 lines and left this because the repair spans the family.

Verified myself, and the reviewer's "eight-fold shape in all six" is loose: `grep -c "\*\*Move\*\*"` over `domains/tasks/projects/*.md` returns 3, 5, 4, 8, 4 and 8 — build-child-commit, build-child-deploy, build-parent-commit, build-parent-deploy, build-singleton-commit, build-singleton-deploy in that order. Eight is this document's count and the singleton-deploy's, not the family's. The SHAPE is what recurs; the count follows each document's stage count.

That does not weaken the claim — it means a collapse would remove between three and eight lines per document rather than eight everywhere.
