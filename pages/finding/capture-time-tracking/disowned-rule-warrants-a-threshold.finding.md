---
id: 4edaefa8-e719-596f-9db4-46c877809a09
slug: disowned-rule-warrants-a-threshold
page-type-slug: finding
title: "Disowned rule warrants a threshold"
domain-slug: task/capture-time-tracking
---

# Claim

A claim about Alan's own body stands as a code comment and nowhere else, and a live behaviour rests on it. Alan read it on 2026-08-10 and said it should not exist.

# Evidence

`packages/alanwalton/daily-tracking-cli/src/lib/hourly-confirm-stall.ts:178-181`, whole: "The ledger dark is CORRECT while Alan is not tracking — his own rule is that not-measuring indicates around level 1, so firing on a genuine gap would destroy the inference the ledger exists to support."

What rests on it is the same comment's next sentences, at lines 181-184: "What is not correct is the ledger dark while he is demonstrably working ... So the threshold is not elapsed time: it is how many of the dark hours he spent at the machine." The disowned claim is the stated warrant for that threshold, so the behaviour now stands on a reason its subject rejects.

Nothing computes it. Searched `packages/alanwalton/daily-tracking`, `packages/alanwalton/daily-tracking-cli` and `packages/alanwalton/personas` on 2026-08-10 for the claim and for a safety default of one: no code sets a safety level from untracked time, and every other match for "level 1" is a persona relationship level. The claim is a warrant in prose and is not a value anywhere.

Alan was shown the sentence in the course of writing `safety-level`'s Design. He answered: "No for the second, does that exist anywhere? It shouldn't." The line was not written into the domain.

`domains/code-quality.md` states in its Design that an instruction is never a code comment, and in its Intent that every code comment is a field a tool reads. A claim attributed to Alan, in a comment, holding up a threshold, is outside both.
