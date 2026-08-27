---
id: 4809bd22-6b99-522d-9035-59a92a405f45
page-type-slug: finding
title: "Delegated code reading read as checked"
domain-slug: page-type/role
---

# Claim

A delegate reading code for a reviewer returned two confident wrong answers that read exactly like checked ones: one reported a Design line false off the watch gate, a different mechanism with no commit fallback, and one reported another partially false off `ops pipeline main-failures`, a read-only reconstruction rather than the decider that writes `resolved`. Both would have landed a repair on a correct line. What caught them was the reviewer going to the machinery itself.

# Evidence

Observed by the seat that read `domains/pipeline.md` on 2026-08-13 under `review-instructions`, which delegated the code reading and then checked it, and relayed here rather than re-derived: I saw neither the delegate's report nor the code.

Two wrong answers out of an unstated number of delegated readings on one document is the whole of the population seen. Nothing measures how often this happens, how many such answers have been acted on, or whether the delegate was told what to run.

`domains/role.md` already carries Secondhand — treat what anyone reports as evidence rather than fact — so this is a measured case of the failure it names rather than a new one.
