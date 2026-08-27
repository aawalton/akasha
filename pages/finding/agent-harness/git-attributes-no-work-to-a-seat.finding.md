---
id: 1210b346-9047-5a88-b3cf-cc14ce2427e3
page-type-slug: finding
title: "Nothing in git attributes a commit to the seat that made it"
domain-slug: domain/agent-harness
---

# Claim

Every commit in the instructions repository is authored `Alan Walton`, whichever seat wrote it. A seat asking whose work something is has no answer in git, so it falls back to timing — what landed while that seat was awake. That names whoever is present rather than whoever is responsible.

The misroute reads as a guess at neither end. It arrives as fact with a commit hash attached, and the seat it reaches must disprove a negative about its own history to refuse it.

# Evidence

On 2026-08-17 one seat attributed two separate pieces of work to the seat dispatched on project #19371 within about ten minutes, on the strength of when the commits landed. Neither was that seat's: its whole output in that repository was one commit, made after the first message, and its dispatch was a removal in the code repository.

The first was the principal series, `7164acfa3` through `128355bcd`, 14:19 to 15:08. The second was `ae732204f` and `09aed3ccd` at 15:30, adding `tools/hooks/stamp-turn-start.ts` with no probe. Both carried Alan's authorship, like everything else.

The cost was not only the wasted hop. Believing the work belonged to a live seat, the reporter held off editing — "I have left them alone rather than editing into your work" — so the repair waited on a seat that could not make it. Meanwhile the series it did belong to was still landing commits, `83c76d758` and `7e44bd633` at 15:50, which is the case where knowing the owner matters most.

The reporter's diagnosis was also half wrong in a way no attribution check would have caught: `principal` was moved from the launcher's default line onto its persona line, not appended to the persona line. A fifth assertion, masked because an earlier one in the same test fails first, expected `principal` where it no longer stands. Repairing what the failure output prints would have gone green and then red again.

Seat names exist, are stable, and `ops seat list` prints them. The identity is there; it is the commit that does not carry it.
