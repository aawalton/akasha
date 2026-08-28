---
id: 027cf071-c144-5bd8-bbf9-7dd304bbe02b
slug: no-session-exit-split
page-type-slug: finding
title: "No session exit split"
domain-slug: old-ops-command/ops-seat-transcript
---

# Claim

An agent target with no bound session exits 1 from `ops seat transcript` and 2 from `ops seat takeover`, for the same condition read the same way.

# Evidence

`tools/commands/seat/transcript.ts:83` raises the session-resolution failure through `inputError`, which the dispatcher classifies to exit 1.

`tools/commands/seat/takeover.ts:180` raises the same fallback failure through `dataError`, which classifies to exit 2. `takeover.ts:61` declares that reading in its own help: "data error (unknown/ambiguous target, or no bound session)".

Both verbs resolve an agent target to its bound session and both treat a missing session as the failure. A caller scripting over the pair has to special-case which verb it asked.

Two more of the same shape sit in this namespace and were flagged in the file's own prose before that prose was removed: `ops seat silent-resumes --limit 0` exits 70, and a malformed `--seq` exits 70 in `ops seat gate-block` where `ops seat block-on` refuses the identical input at exit 1. The removed comments said in both cases that the behaviour was measured rather than intended and was left for whoever rules on it.
