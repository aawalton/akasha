---
id: 4f4e4878-52ad-548d-acd1-c15cae0e1ac9
page-type-slug: finding
title: "Count floor admits wrong members"
domain-slug: domain/global
---

# Claim

A population floor spelled as a COUNT is satisfied by the wrong members exactly as readily as by the right ones, so an acquisition that comes back the right SIZE with the wrong contents passes every bound the check carries and prints as full coverage. Only a floor that names its members catches it, and the checks on this audit that carry a count are the ones whose coverage nobody can falsify.

# Evidence

Demonstrated by #18469 while verifying its own widening of the watcher-tray Rust gate, and reported as a class rather than as its own defect.

THE DEMONSTRATION. Its first corpus bound was a count drawn from the crate root's `mod` declarations — five modules plus the root, a floor of six. It then deleted `updater.rs`, a file `main.rs` declares. Six files still stood against the floor of six, because `build.rs`, which no module declares, silently took the missing member's place. The run printed `[over 6 of 6 rust source files]` and exited 0. Both terms agreed, the arithmetic was right, and the crate had not been read.

WHY THIS IS NOT WHAT `corpus` FIXED. #18443 made `corpus` a required argument across `examinePopulation`'s 172 call sites precisely so a check could not certify a population it had not acquired. That closes the case where acquisition comes back SHORT — fewer members than the floor, which the comparison catches. It does not touch the case where acquisition comes back the RIGHT SIZE with the wrong members, because nothing in a count can distinguish the two. The repair the fleet already paid for and the repair this needs are different repairs.

WHY IT REPORTS AS COVERAGE. The failure surfaces as a green run over a stated bound, which is the exact shape a reader trusts most: a number, matched, printed in the success line. There is no diagnostic, no shortfall, no `UNVERIFIED` lead. A reviewer reading the header and the output agrees with both.

WHAT IS OWED. Every check on this audit whose floor is a count rather than a member list can have this, and the set has not been enumerated — that enumeration is the work. `check-eso-global-decl-consistency` (#18467) and `check-dep-versions` (#18464) both moved to derived member sets in this tree and are the shape to copy; a floor stated as a count is the shape to find.

Not measured: how many standing checks spell their floor as a count. One instance is verified, the generalisation is argued from the mechanism rather than from a census.
