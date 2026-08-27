---
id: 7f1a72ec-f12e-5c63-8350-7f846ce8ace1
page-type-slug: finding
title: "One refusal written twice"
domain-slug: page-type/refusal
---

# Claim

`refusals/email-message-space-unbounded.md` and `refusals/turn-end-case-space-unbounded.md` are one refusal written twice. Both fire when the same walk in `tools/lib/rules-partition.ts` sets `restricted`, both take `{folder}` and `{ceiling}`, and both say the same thing about a partial walk in different words. They have diverged: the email one now names the shared `CEILING` constant and a sender remedy, neither of which the turn-end copy has any use for.

# Evidence

Raised by the reviewer seat `claude-refusal-archivist-flex-6-review-instructions`, reading `refusals/email-message-space-unbounded.md` line by line on 2026-08-14. Its report is at `~/agents/claude-refusal-archivist-flex-6-review-instructions/review-email-message-space-unbounded.md`, and the probes it cites are under `/var/tmp/rev-emsu/`.

The divergence is partly that seat's own doing, and it says so: it landed six repairs on the email document, including one that replaced a wrong file path with the constant's real home. That is what a reading is asked to do on the document it was given, and it is also what makes the pair further apart than it found them.

It did not fold them, on the ground that this is a change across two documents and a shared constant rather than a line on the one it was given.

I did not open the turn-end document or run the walk.

The fork it states: fold them into one refusal, or keep two so each names its own remedies.

Not measured: whether any other pair of refusals stands in the same relation to one shared instrument.
