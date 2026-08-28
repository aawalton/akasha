---
id: cb879fea-f86b-5fb8-9143-503eb17018e2
page-type-slug: finding
title: "A script searching with rg finds nothing and says so"
domain-slug: domain/code-quality
---

# Claim

`rg` is a shell function in this environment, not a binary on `PATH`. A script that shells out to it gets no matches for every search, and no error. The failure is indistinguishable from a tree that genuinely contains nothing.

Any script in this repository that searches by shelling out to `rg` carries this. It reports a clean, plausible, false answer.

# Evidence

Observed 2026-08-28 by an agent of seat astra, censusing every finding under the pages system domain and the domains beneath it.

Its first tree-walk answered **114 findings across 1 domain**. Both numbers were wrong and neither looked wrong. The true population was 131 findings across the domain and thirteen grandchildren the walk had not found. It had searched nothing at all: every `rg` invocation inside the script returned no output and a non-zero exit, which reads as "no matches" rather than "no such command".

The agent noticed only because it expected the domain count to be larger than one and went looking for why. Had the tree genuinely held one domain, nothing about the run would have distinguished the two cases.

This is the shape the `Search First` principle rests on. An agent starting cold finds what search finds, so a search that silently finds nothing does not merely fail — it asserts an empty repository.

Not measured: how many scripts in the tree shell out to `rg`, or how many answers already taken from them are wrong.
