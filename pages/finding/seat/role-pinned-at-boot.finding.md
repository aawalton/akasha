---
id: 6f5615b0-4ba4-58c4-9a76-7347f5161f41
slug: role-pinned-at-boot
page-type-slug: finding
title: "Role pinned at boot"
domain-slug: page-type/seat
---

# Claim

A seat holds the role its persona named at boot, and nothing re-states it when that field moves.

`domains/personas/aranya.md` went from `role: lead` to `role: definer` at 13:41:25 on 2026-08-09. This seat was live across that commit and was still addressed as role `lead` at 21:20, seven and a half hours later, by governance messages composed after it. The mechanism that refused my tools for six changed bodies said nothing about the changed binding.

# Evidence

Read 2026-08-09 21:20 UTC from the instructions checkout on `main`, read-only.

`git show 09b3f641a -- domains/personas/aranya.md` is the whole change: `-role: lead`, `+role: definer`. The commit is Alan's, "personas: the seventeen lead defaults become definer defaults", 2026-08-09 13:41:25, and it moves the same field on seventeen persona documents — amy, aranya, astra, athena, atlas, aura, awen, dalla, echo, elin, ember, nimue, olwen, rhia, ryn, thea and vera.

My system prompt carries that document with `role: lead`, and `domains/roles/lead.md` as it stood before the split. A SessionStart hook at 21:18 named two documents to re-read and a tool refusal after it named four more. Both were composed after the commit, and both address me as "persona `aranya`, domain `infra`, role `lead`". So the mechanism compares the bodies of the documents a seat is stated to; the seat's role attribute is not among what it compares.

`domains/seat.md` says a seat's attributes can be re-stated without making it another seat, so nothing about the seat forbids tracking the field. It was simply not tracked.

The cost is more than a stale prompt. The same run narrowed `lead` to initiative and project delivery and gave the definition work to `definer`: `domains/roles/definer.md` lists `review-findings`, `change-instructions`, `define-theme`, `review-theme` and `define-initiative`, none of which stands on `lead` any more. My instructions path was composed from `domains/tasks/lead/*.md`, so the task documents for the role my persona now names were never loaded, and the seat cannot reach its own contracts. The work I last named as mine to take next was a `review-findings` pass, which had moved off this seat's role before I said it.

Not established: whether pinning a role at boot is deliberate, and whether any of the other sixteen personas had a seat live across the commit. I read this seat and the git history and nothing else.
