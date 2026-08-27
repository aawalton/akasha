---
id: e046b601-9965-50cf-b330-75de5651d775
slug: two-seams-with-inherited-rules
page-type-slug: finding
title: "Two seams with inherited rules"
domain-slug: task/define-initiative
---

# Claim

Two lines of `define-initiative` may each be one claim with a document its reader already carries. Line 25, "Take Alan's ruling on each objective before drafting the next", sits against One At A Time on `domains/persona.md`, which every reader boots. Line 24, "Write each objective as a state the system is in", sits against End State on `domains/memory.md`, inherited through `initiative`. The reading kept both and named the seams rather than merging them.

# Evidence

Raised by the review-instructions reading of 2026-08-07, which kept 14 of 15 lines and gave a reason on each side.

For line 25: One At A Time binds how many items reach Alan in one message; this binds when you draft. The reviewer kept it because the warrants name different mechanisms — One At A Time is about items he never reached, this about items he read and ruled on as a group, where the weak one rides on the strong ones. The counter it stated: obey One At A Time and he rules one at a time whatever order you drafted in, so the two acts may be one claim in practice.

For line 24: End State binds an objective's DESCRIPTION. Verified myself in `tools/document/schemas/initiative.ts` — an objective is two slots, `statement` (SM, bolded) at line 63 and `description` (MD) at line 65 — so this line is the only one reaching the statement, which is the slot an act-shaped objective goes wrong in first. Its warrant, that an act-objective is closed by performing the wrong act, is one End State does not carry. If they merge, the statement slot and that warrant both need somewhere to go.

Both lines verified in the live document at 24 and 25 as quoted. Neither seam has a mechanical answer; both turn on whether two acts are one claim.
