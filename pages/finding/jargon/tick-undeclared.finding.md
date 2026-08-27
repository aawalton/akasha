---
id: 628dc685-9f21-577f-be5c-63c2bced4c22
slug: tick-undeclared
page-type-slug: finding
title: "Tick undeclared"
domain-slug: barred-meaning/jargon
---

# Claim

`tick` carries a domain's worth of meaning across seven documents, including the definition of the coined domain `daemon`, and no domain declares it. By the test on `jargon`, it is either jargon to be replaced plainly or a concept to be declared, and nothing in the corpus settles which.

# Evidence

Measured 2026-08-19, while naming the merge queue's properties under `define-domain-structure`.

`domains/jargon.md` defines jargon as "a word no domain defines that a plainer word could replace", and adds that "a word the code spells is jargon on the same test as any other". No domain declares `tick`: it appears in no folder as a document and in no `required-reading-slugs:` list.

That surface is `pages/barred-meaning/jargon.barred-meaning.md` now, carrying the same definition and deferring the judgment to Plain Or Declared on `pages/domain/global.domain.md`; the clause about a word the code spells did not move with it. `tick` is still declared by nothing — no `tick` page of any type is tracked.

Nine occurrences stand across seven documents. `domains/daemon.md` carries three of them, one being the definition itself — "a loop a service runs on a tick" — with "A daemon runs one tick at a time" beneath it. `domains/pipeline.md` Design: "Each worker reads the authoritative rows on every tick". `domains/ops-merge-queue.md`: "it observes a write on its next tick". The rest stand on `domains/alerts/dispatcher-liveness.md`, `domains/services/temper-watcher-liveness.md` and `domains/roles/game-master.md`, where the game-master use is a different sense again.

Re-measured 2026-08-27 in akasha: nine occurrences across five documents, the same shape at moved spellings. `pages/domain/daemon.domain.md` carries five — the definition at line 13, "A daemon runs one tick at a time" at 17, and three more in its Compose rule at 23, 25 and 29. `pages/page-type/pipeline.page-type.md:21` is the Design line, reading pages rather than rows now. `pages/page-type/idle-save.page-type.md:21` is a site the original reading did not have. `pages/workstation-service/temper-watcher-liveness.workstation-service.md:25` and `pages/role/game-master.role.md:93` carry the last two, the game-master use still a different sense. The merge-queue and dispatcher-liveness documents are gone.

Two readings, and nothing distinguishes them:

- The word is jargon, and each use is replaced by the plain phrase it stands for. `daemon` would then be defined without it, which is where the cost sits.
- The word names a real thing — one pass of a loop — and wants a domain of its own, at which point every use above is exempt in that one declared sense.

The second reading is the likelier of the two, because a definition of a coined domain leans on the word, which is not what a replaceable word does.

Not measured: the code repository's own spelling, and how many occurrences a rename would reach there. `domains/jargon.md` holds that the count is the price of the work rather than the verdict, so it does not decide this either way.
