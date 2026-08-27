---
id: ce488457-cb57-522f-a3bf-fdc672935a82
page-type-slug: finding
title: "Reparent has no verb"
domain-slug: domain/agent-harness
---

# Claim

There is no verb that rehomes a live seat. Ownership is spread over four carriers with a different writer for each and none at all for the last, so completing the act means hand-editing another agent's state file — which nothing refuses, nothing records, and nothing can replay.

# Evidence

Measured 2026-08-02 while rehoming seven rows and four live seats between two leads.

Each carrier has its own writer and none of them knows about the others. `owner` takes `ops project add-owner --seqs`. `claimedAgent` is written at claim time and `add-owner`'s help says outright that it never touches it. `custodyTransfer` is written by `ops project move-to` as a side effect of a status change, so moving it means moving the row. And `parent` in `~/agents/<name>/spawn-state.json` — the carrier the terminal status line and `ops seat in-flight` both read as ownership — has no writer at all after the spawn that created it.

So the transition completed as `sed -i` over three JSON files in another agent's directory. Nothing gated it, nothing logged it, and nothing would replay it: had the edit been wrong, the only evidence would have been a status line quietly showing the wrong count.

That shape is one this estate refuses of itself. `folders/instructions-repo.md` holds Durability — every change through a verb — precisely so a change cannot land unvalidated and uncommitted. `~/agents/` sits outside any perimeter, so the same act is unremarkable there.

What a verb would have to take is already enumerable: the seqs, the outgoing holder, the incoming holder, and a reason. What it would write is the four carriers plus the note each row needs, in one act, refusing a partial application — the state this finding's sibling records as the dangerous one, where `owner` says the work moved and everything else says it did not.

Not measured: whether any seat other than a lead is ever rehomed, which decides whether this verb belongs beside `add-owner` or is one rung of a wider custody verb.
