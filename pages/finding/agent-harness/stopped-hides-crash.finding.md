---
id: 69ed5f0d-7baa-5253-ad3b-4841b66dfc4c
page-type-slug: finding
title: "Stopped hides crash"
domain-slug: domain/agent-harness
---

# Claim

A reviewer that finished and a reviewer that died mid-pass both come to rest at `stopped`, so nothing separates a completed review from an abandoned one.

The seats the nightly review-perimeter pass spawns are told to hand back and then stop without retiring, so `stopped` is their designed end. It is also what a crash leaves behind. No record says which happened, and the coordinator retires before anyone reads them.

# Evidence

The first unattended pass of `review-perimeter.timer` ran on 2026-08-04 at 22:00:04 MDT. The unit exited 0 and minted coordinator seat `019fd014` (`claude-domain-archivist`), which read the worklist, recorded 48 subjects owed a reading, laid down a ledger, and dispatched three reviewers before retiring cleanly at 231 messages.

The three reviewers all came to rest at `stopped`:

- `019fd020` `claude-archivist--lead-review-initiative` — 26 messages
- `019fd0eb` `claude-archivist--projects-build-parent-deploy` — 6 messages
- `019fd0f4` `claude-archivist--projects-build-singleton-deploy` — 27 messages, its last text being "All pinned surfaces read. Now stage 1 — what governs the subject."

Their spawn prompt reads: "At the hand-back stage, hand back to claude-domain-archivist via `ops seat send`, then stop without retiring yourself." So the status token is the designed one and is not by itself evidence of a kill. The message counts are what says these ended at or before stage 1, against a coordinator that ran to 231 on the same night.

`ops seat exits` carries a durable record for exactly one of the three: `claude-archivist--lead-review-initiative`, `boot-reconcile`, `code=1 reaper=none`, "spawn-state wrapper pid dead (kill -0 ESRCH)", classified `crash-reaped`, observed 2026-08-05T13:40:48Z. The other two return `recorded=0 · coverage=complete`, which that instrument states means no exit site observed a death rather than that none occurred.

Not measured: whether the coordinator received any hand-back before it retired, which of the 48 subjects its ledger ordered first, and whether a human stopped any of the three. The 13:40 observation is when the death was noticed at boot-reconcile, not when it happened.
