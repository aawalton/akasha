---
id: 8587cc9b-c897-58b9-943b-9cb6f4bf0cf8
slug: undeclared-definite-references
page-type-slug: finding
title: "Undeclared definite references"
domain-slug: role/handler
---

# Claim

`domains/tasks/handler/handle-inbound.md` refers to five things by the definite article that no document names, links or declares: the extractor, the tested decider, the approval gate, the delivered document, and your escalation target. A seat holding only this task cannot resolve any of them.

# Evidence

Found by a reader dispatched at the file under the plain-language initiative on 2026-08-06, which landed fourteen wording rewrites and could not settle these.

Plain Or Declared says write the plain phrase or declare the word as a domain first. Neither has been done here, but the fault may not be language at all: the concrete binding for a handler may live in that handler's own deployment rather than in the corpus, in which case the definite article is right and what is missing is a line saying where the referent comes from.

Two further terms on the same document were carried back for the same reason. `the seat that owns you for liveness` reads either as loose description, where `the seat that keeps you alive` is strictly plainer, or as a registered relationship in the liveness machinery at `tools/hooks/hold-seat.ts` and `gates/hook-liveness.ts`, where the plain phrase would drop the registration and let a seat satisfy the wording without being the one meant. The bullet's own point is that three separately supplied things must not be treated as one, which leans toward the registered reading. And `warm resume` appears in no other document and in no tool in this repo; if it names one kind of restart as against another, it wants declaring, and if it does not, the plain phrase should replace it.
