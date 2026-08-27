---
id: 5d9aa639-296c-52ed-9a09-cb72e6b4013a
page-type-slug: finding
title: "A seat that dies at birth reads as one never dispatched"
domain-slug: domain/agent-harness
---

# Claim

A seat that dies at birth is indistinguishable from one never dispatched. Its project falls back to `awaiting_worker_seat`, which is what a project awaiting dispatch reads as. It sends no message, records no obligation and writes no transcript, so the inbox, the blocked census and the logs all answer truthfully and answer nothing. A dispatcher's only evidence of success is the spawn id the call returned, and that says a row was minted, never that a seat came up.

# Evidence

Tree #19315 on 2026-08-17. Seven children were spawned in one burst, 13:16:29 to 13:16:45Z. Four — #19316, #19317, #19320, #19322 — never persisted a session transcript, on disk or in SeaweedFS. Each was later relaunched with `claude --resume <session-id>` against that absent session, printed

    No conversation found with session ID: 16620af8-…

and exited in seconds. Their whole spawn logs are about 1,970 bytes: a boot banner and that line. The three that lived attempted no resume and ran to logs of 1.4 to 3.6 MB. `ops seat transcript` on a dead one answers `no transcript object … nothing to resume`.

Both the manager holding the tree and the lead above her read those four rows as workers not yet raised. The manager had dispatched seven, received seven ids, and treated that as seven seats. Over three hours passed before anyone knew, and it surfaced only when the lead read `ops seat list` against the project list by hand. `ops seat exits` had carried all four the whole time — three at 16:01:25 as `boot-reconcile` finding wrappers dead, one at 16:30:32 as `child-exit`/`child-crashed` with its wrapper alive, `reaper=none` on all four — but nothing reads `ops seat exits` unless somebody already suspects a death.

A seat dying mid-work leaves a transcript, a partial commit or an obligation. One dying before its first turn leaves a clean tree and a plausible story, and the longer it stands the more reasonable the story gets: a manager pacing her workers, a queue not yet reached.
