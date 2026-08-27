---
id: 6051ad1f-8200-501b-b211-0ca14034cc0a
page-type-slug: finding
title: "Peek match refuses the documented order"
domain-slug: domain/global
---

# Claim

`tools/checks/resume-notices.ts` matches one contiguous literal, `ops seat inbox --all --peek`, so the restart-recovery clause is refused if the two flags are written in the other order — which is the order `ops seat inbox --help` prints in its own example. An agent that restored both flags in the documented order was refused a second time by words that told it nothing new.

# Evidence

Probed by the dispatched `review-instructions` seat reading `refusals/restart-clause-without-peek.md` on 2026-08-12, driving the check against the live document with only that substring swapped: reversed flags refused, both flags named separately refused, exact string with an extra flag appended passes, unchanged passes.

That seat repaired the refusal to name the exact string, so the trap is now signposted. Its recommendation on the other repair — loosening the match to accept either order — was to leave it: pinning the wording is worth more than sparing the fixer one refusal, now that the refusal says which order to write.

Not measured: whether anyone has hit the trap.
