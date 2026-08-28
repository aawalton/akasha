---
id: 00106d5a-bfd6-5e3d-9e1b-9c14f7401f11
slug: write-guard-nested-or-gap-held-open-by-size-ceiling
page-type-slug: finding
title: "The write guard's nested-or gap is held open by the size ceiling"
domain-slug: domain/page-storage
---

# Claim

The write seam's synthetic-narrow guard stops descending after one `or` level, so a narrow nested two deep reaches a patch or a remove unrefused. It cannot be repaired in place: `file-write.ts` stands at 17,810 characters against a 15,000 ceiling, and the gate refuses any write that leaves the file over, including an edit that shrinks it. The gap and the ceiling are one item rather than two, because splitting the file is the only route to the fix.

# Evidence

`refuseSyntheticNarrow` is declared at `file-write.ts:206` and called from `locate` at `:247`.

Measured by running `patchFilePages` against `project`, every where carrying a second condition that could match nothing, so no page could be written whatever the guard decided:

- bare `seq`, bare `createdAt`, bare `userId` — all three REFUSED
- `or[ seq ]`, one level deep — REFUSED
- `or[ or[ seq ] ]`, two deep — NOT refused; it proceeded and patched `[]`
- `or[ or[ or[ seq ] ] ]`, three deep — NOT refused; it proceeded and patched `[]`

The guard unwraps one level and then does `if ("or" in one) continue`, which skips a nested leg instead of descending into it. So its coverage is one level wider than a reading of that line suggests, and still short at two.

The file is unmodified from HEAD at 17,810 bytes, so the overage is pre-existing rather than another agent's in-flight work. An edit that would have reduced it to 17,005 was refused: `would stand at 17,005 characters, 2,005 over the 15,000-character ceiling ... This refuses the write that would leave the file over, so reducing an oversized file part-way is refused too.`

The read path's equivalent guard descends to any depth, landed as `8ba83aac8f` and measured refusing at depths 0 through 6. So the two seams now disagree about a nested narrow: the read refuses it, the write admits it.

Not established: what a correct split of `file-write.ts` looks like. No non-test call site in either repo nests a narrow two deep today, so nothing is known to be exercising the gap.
