---
id: fc140ecf-6ece-5c73-8866-b43de7c9c8fb
page-type-slug: finding
title: "Ask stamps a child the ladder will not park"
domain-slug: barred-meaning/project
---

# Claim

`ops project ask` stamps `alanAsk` on a child row without refusing, so a child can address Alan directly on its own row. The child ladder refuses to park there, so the stamp lands and the park cannot — the verb admits a route the ladder is built to deny.

# Evidence

Alan's rule, stated 2026-08-15: a question travels up the principal chain. A child asks its manager, the manager asks the lead, the lead asks Alan. Nothing may reach past its own principal.

The ladder already enforces this. Verifying #19213, a child of #18963, `ops project ask 19213` stamped the row:

    #19213 alanAsk stamped 2026-08-15T16:15:31.222Z — on who answers for a per-`queryid` query regression…

and the move was then refused:

    refusing to move project #19213: `awaiting_alan_verification` is not on the child ladder,
    and is not one of the exits (`someday_maybe`, `not_doing`, `duplicate`) that sit on neither.

The refusal is correct and is the rule working: a child does not wait on Alan, it waits on the layer above it, and the ask belongs on the parent row that layer holds. What is wrong is the stamp landing at all. `ops project ask --help` describes its own predicate as reading `projects/<seq>.md` for a paragraph beginning `Awaiting Alan` — it tests the document's prose and never the row's ancestry, so it cannot tell a parent from a child.

Two consequences, both live on #19213 until it was repaired by hand. The row carried a durable `alanAsk` record while sitting at a status that names a different holder, so `ops project list` and `ops project census` report an ask that nothing can act on. And the seat that ran the verb reads a stamped ask as the handoff having happened, when the handoff was refused a moment later by a different verb — the two halves of one act report opposite outcomes and neither reads the other.

The repair is on the verb rather than the ladder: refuse a child, and name the parent whose row the ask belongs on. That keeps one carrier for the ask and puts it where the layer that reaches Alan can actually hold it.
