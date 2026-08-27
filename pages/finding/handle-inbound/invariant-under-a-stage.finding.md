---
id: 81521331-c0a4-5ce8-8c9c-a136a71ac375
page-type-slug: finding
title: "Invariant under a stage"
domain-slug: task/handle-inbound
---

# Claim

A bullet on `handle-inbound.md` is an invariant wearing a stage bullet. L6 — "Keep the seat that owns you for liveness separate…" — sits under stage 4, "What is left behind", but binds from stage 1 through stage 4 rather than at the end. The document carries an Invariants section, and the bullet has that shape.

# Evidence

Raised by the review-instructions seat on `domains/tasks/handler/handle-inbound.md`, which left it in place rather than moving it between sections.

It verified the three parties the bullet keeps apart are genuinely three: `KI_HANDLER_SPEC` carries owner "amy", `decideKiDispatch` escalates to "aine", and the account is the uuid the extractor prints. So the claim is sound and only its placement is in question. I did not read the code.

Not measured: whether a seat has ever applied it late because of where it sits.
