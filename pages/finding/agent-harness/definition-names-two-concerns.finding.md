---
id: 98fc9866-f5ad-55ef-ad82-67a1cadb667a
slug: definition-names-two-concerns
page-type-slug: finding
title: "Definition names two concerns"
domain-slug: domain/agent-harness
---

# Claim

`domains/agent-harness.md`'s Definition names two concerns — everything an agent must read and obey, and the flow its work follows — where `domains/domain-definition.md` allows one, and the domain's sixteen glossary children part along that seam.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/agent-harness.md` dispatched from `review-documents`. That reading listed and judged thirty-three lines bottom to top and landed no change to the Definition; it stamped `reviewed-at:` alone, at `350ac7a04`.

`domains/domain-definition.md` reads "A Definition names one concern. Where a second is needed to cover the area, the area is more than one domain." The line it bears on reads "**Agent harness** — everything an agent must read and obey, and the flow its work follows."

`ops instructions glossary --domain agent-harness` returns sixteen children, re-run here rather than taken from the reading. They part along the seam the Definition names: `agent-governance` ("what an agent must have read before it acts"), `instructions-harness`, `refusal` and `ops` sit on the read-and-obey side; `land`, `agent-hook`, `supervisor` and `interview-session` sit on the flow side.

`domains/lists/foundational-layers.md` describes this layer as one thing — "stands on the domain system, and is what makes every change" — which is the reading under which the two halves are aspects of one concern rather than two.

Not measured: whether the sixteen children divide cleanly enough to carry two parents, what a split would cost the four layers standing on this one, or whether any reader has been misled by the two-part line. The reading that raised it recommended the line stay.
