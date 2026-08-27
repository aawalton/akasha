---
id: 26aae458-0e2e-5760-8688-8c3109680f6c
page-type-slug: finding
title: "Seat bucket keys spelled in a third reader"
domain-slug: domain/code-editor
---

# Claim

The seat bucket's key names are now spelled in three places — two bash readers bound by `statusline-constants` and the code editor's own footer resolver — and nothing holds the third to the other two.

# Evidence

`seatFooter.ts` in `~/code-editor` reads `~/.instruction-seats/<agent-id>.json` and spells `persona`, `domain`, `role` and `task` in its own constants, alongside the assignment names. `statusline-constants` binds those same names across the two bash readers, and no check reaches the editor repository — it has no remote and runs no CI.

So a rename in the seat store would be caught in two of the three readers and silently blank the third. What makes it silent is the reader's own design: an entry it cannot find reads as a seat that has stated nothing, which is a legitimate state and draws an empty footer. Nothing distinguishes "stated nothing" from "the key moved".

The delivering seat on #18437 raised this itself and left it for its lead rather than widening its change to reach it. Filed here rather than fixed, because where the binding should live is a judgment: either the editor is brought under a check that reads the instructions repository, or the key names become a contract stated once and read by all three.
