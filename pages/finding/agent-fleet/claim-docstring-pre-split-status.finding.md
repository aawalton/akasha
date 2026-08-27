---
id: 99fb64db-c406-5cb7-97a3-ea375d57d4f9
slug: claim-docstring-pre-split-status
page-type-slug: finding
title: "Claim docstring pre split status"
domain-slug: domain/agent-fleet
---

# Claim

The docstring on `deliverClaimedMessage` in `packages/agents/messages/tools/agent-tools.ts` names both claim transitions in the vocabulary that was split away, calling the claim an atomic `pending → read` and the release an atomic `read → pending`. Both write `claimed`. The same docstring says four steps later that the row stays `claimed`, so it contradicts itself, and it is what a reader debugging a message that never arrived reads first — sending them to look for `read` rows that are sitting at `claimed`.

# Evidence

Read in `~/code` on `main` at `383bf60d35c15cd5d10cd07f39ac33ffb38e2bfa`.

`packages/agents/messages/tools/agent-tools.ts`, in the docstring over the claim-render-release ordering:

- step 1 — "Claim (`claimMessage`, atomic `pending → read`, #14290)"
- step 3 — "Release-on-failure (`releaseMessageClaim`, atomic `read → pending`, #14374)"
- step 4 — "the row stays `claimed` until an" observation advances it

Neither function does what steps 1 and 3 say. `packages/agents/shared/supabase-realtime-claim.ts:59-65` has `claimMessage` update `status` to `CLAIMED_MESSAGE_STATUS` guarded on `.eq("status", PENDING_MESSAGE_STATUS)` — `pending → claimed`. `releaseMessageClaim` at `:85-93` updates to `PENDING_MESSAGE_STATUS` guarded on `.eq("status", CLAIMED_MESSAGE_STATUS)` — `claimed → pending`. `message-status.ts:33,44,54` declares `pending`, `claimed` and `read` separately, so they are three states rather than two spellings of one.

The declaring file is right and says so at length. `releaseMessageClaim`'s docstring carries "IT DOES NOT REACH `read`, deliberately: that value means something observed a consumer taking the row", and names rows "claimed before the vocabulary split" carrying `read` from when the claim wrote it directly. `witnessMessageRead` below it is "the only writer of `READ_MESSAGE_STATUS`". The split happened, the shared layer was updated for it, this consumer-side docstring was not.

What makes it a finding rather than a typo is where it sits: `agent-tools.ts` is the delivery path's own file, and step 4 already carries the current vocabulary, so one screen gives both answers with nothing saying which is live. Debugging a message that never surfaced, the query steps 1 and 3 point at finds nothing, the stuck rows being at `claimed`.

Found ingesting `dirty/questions/code-repo-head-documents-agents.md`, which recorded this as the one difference running the other way — the head document had it right and the docstring was the stale copy. That head document has since left the code repository; the docstring has not.
