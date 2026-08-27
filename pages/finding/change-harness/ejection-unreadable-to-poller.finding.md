---
id: a2a78ba0-4280-562b-948a-762abfbccf9d
page-type-slug: finding
title: "An ejected merge-queue entry reaches the waiting deploy as a stall, not as an ejection"
domain-slug: domain/change-harness
---

# Claim

The deploy's merge-queue poller reads an ejected entry as an unobservable one, so a decision the coordinator reached in three seconds is reported as a stall twenty-five minutes later, and reported as the wrong thing. A missing entry page is a decisive signal here, not an absent one: the queue removes an entry precisely when it has finished deciding it, on ejection and on the deploy paths in `deploy.ts` alike. The poller has no branch for any of them.

# Evidence

`ejectEntry` in `tools/lib/merge-queue-coordinator/moves.ts` patches the entry with `status: ejected` and its `failure-reason`, then removes the page in the next statement. That is deliberate: `entriesEjectedAtMain` in `store.ts` recovers ejected entries from git history, so the patch exists to put the verdict in a commit rather than to leave it standing in the queue.

`pollMergeQueueEntry` in the code repository knows nothing of that arrangement. The branch that produces this is `move-to-deploy-poll.ts:78-104`: `row === null` feeds `MISSING_ROW_FINGERPRINT` to `decideStall` and continues the loop, and `STALL_WINDOW_MS` is the only thing that ends it. A page that has gone away is treated exactly as one that has not moved, though no later poll can change the answer.

Project 19440's deploy on 2026-08-22. The coordinator decided the entry in three seconds:

    07:59:51  merge-queue-coordinator: batch 1 formed at main 0e6e760a carrying entries 2
    07:59:54  merge-queue-coordinator: removing staging dir 1 (the file-length pregate ejected) stood=true

The verdict it wrote stands in the memory repository at commit `83a580b08`, one commit before `404d69d65` removed the page carrying it:

    status: ejected
    failure-reason: "bun.lock would stand at 764119 characters on the merged staging tree, over the 15000-character ceiling; split it"
    failure-kind: file-length-pregate

What the deploy reported, 1504 seconds after that verdict was written:

    [queue] 0 ahead · unbatched · stalled · entry row not observable for 1504s
    VERDICT: FAIL — the deploy failed at deploy_queue_stalled:
      merge queue stalled — no progress for 1504s (entry 2, 0 ahead, last status: batched)

Nothing was stalled. `deploy_queue_stalled` names a queue that stopped moving, which sends a reader to the coordinator rather than to the file the pregate named.
