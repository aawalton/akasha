---
id: 7d595bdc-44ae-5f51-95dd-df53e84391bf
slug: changed-line-lacks-dispatch-carve-out
page-type-slug: finding
title: "Changed line lacks dispatch carve out"
domain-slug: page-type/domain
---

# Claim

`domains/domain.md`'s Every Changed Line carries no carve-out for a cut a dispatched review lands, while its parallel on `domains/role-responsibilities.md` carries one — so an unattended `review-instructions` seat may cut a role's Responsibilities and may not cut anything in a domain document's body.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `domains/agent-harness.md` dispatched from `review-documents`. The reading named the asymmetry; both rules were re-read here rather than taken from it.

`domains/domain.md`, Every Changed Line: "Show Alan each line you would change in a domain's Definition, Design, Intent, Principles or Rules." Its third aid sentence: "He can release this for a piece of work, and the next needs its own."

`domains/role-responsibilities.md`, Responsibility Change: "Show Alan each line you would change in a role's Responsibilities." Its aid sentence carries "A cut a dispatched review lands is not a changed line. He can release this for a piece of work."

What the difference reaches: Definition, Design, Intent, Principles and Rules are the whole body a domain document may hold, per `tools/document/schemas/domain.ts`, Tasks excepted. So a reviewer on a domain subject with an agent principal and no release can land no cut anywhere in the body, while `domains/tasks/archivist/review-instructions.md` instructs it to "Cut unless keeping, repairing, trimming or rewriting clearly passes Cut The Obvious".

The reading it came from did not test the collision: nothing on `domains/agent-harness.md` earned a change, so the seat stamped and stopped without being held.

Not measured: whether the asymmetry is deliberate, how many domain-subject readings have landed cuts unreleased, or whether the carve-out on the role rule was written before dispatched review reached domain documents.
