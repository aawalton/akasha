---
id: ce734deb-3189-53fe-a5e0-1e27c5e5afc2
page-type-slug: finding
title: "Deferred bound step reserves nothing"
domain-slug: page-type/pipeline
---

# Claim

A CI step deferred because its bound node lacks room reserves nothing against that node, so lighter later-sequence steps bound to the same host admit ahead of it in the same tick and erode the window it needs, rather than it accumulating one — a delay, not a permanent block, that converges once one tick presents a sufficient window.

# Evidence

Mechanism, confirmed by three agents 2026-07-25: select-next.ts's defer arm is CONTINUE not break (:327-330), per-host, so a bound-full candidate blocks only its own host. The halt arm is the break (:336), reached only by an unbound first-seen candidate (:334-335). Capacity decrements only on a place (:295); the defer arm's comment says nothing is recorded when nothing was admitted.

Consequence: scan order is (branchTier, pipelineSeq, stepCreatedAt), so an older heavy bound step is asked first each tick, defers, reserves nothing, and lighter later-seq candidates on the same host admit that tick — every candidate scans every tick, so a large request can't assemble a window against a stream of small ones admitted first.

Bounded not permanent: seq increases monotonically, so the deferred step keeps first refusal, converging once a tick offers a big-enough window — erosion delays, doesn't foreclose. Observed live: a 5000m step admitted on a node called structurally starving, same sort order, mid-argument.

Fix shape: reserve a deferred bound candidate's node for the tick, or age-based escalation — ownership question #15471 already settled by taking the freed-slot choice from the seq-blind kube-scheduler.

Field evidence, 2026-07-25: the only lever that worked was throttling arrival — pausing pipeline creation 78 seconds.

Coupling with the pin-clearing remedy (worker-16243, 2026-07-25T21:29:03.647Z): clearing a guaranteed-starve pin worked that night — seven pipelines unpinned and ran — but unpinning concentrates freed work onto whichever node has headroom, the condition a large request starves under. Two of the seven, 25947 and 25968, landed on node-05; their five 2000m/4Gi bundles closed the window a step was waiting on. This reservation mechanism makes pin-clearing safe; sequence the two together.

Project #16307, someday_maybe, domain pipeline. Captured, never formally defined; moved here off the row's retired `notes` attribute on 2026-08-15.
