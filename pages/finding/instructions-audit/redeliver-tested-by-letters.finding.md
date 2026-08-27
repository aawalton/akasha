---
id: 70cbfb86-0a5c-53bc-9464-10451f38148d
slug: redeliver-tested-by-letters
page-type-slug: finding
title: "Redeliver tested by letters"
domain-slug: domain/global
---

# Claim

The retirement branch of `tools/checks/resume-notices.ts` tests eight letters rather than a claim: `/redeliver/i` over the restart-recovery clause. A clause carrying those letters and no retirement claim at all passes, and three correct restatements of the condition — "arrives on its own", "delivered again", "re-delivered" — are each refused.

# Evidence

Probed by the dispatched `review-instructions` seat reading `refusals/restart-clause-without-retirement.md` on 2026-08-12, against the live notice with only the clause body swapped. It also found emptying the section outright passes, which is the intended retirement.

That seat repaired the refusal to spell the condition and added a paragraph naming the letters, so nobody is left inventing a wording that only satisfies the test. Its recommendation on the check itself was to leave it, making it test the claim being a judgment about how much of the clause's wording should be pinned.

This is the third branch of this one check found testing a proxy rather than its bar.

Not measured: whether any live clause satisfies the letters without the claim.
