---
id: 1ebf3cb3-959e-5b36-a8c9-62ee1c5f1ecc
page-type-slug: finding
title: "A complete-sounding line stops a reader reaching the document it points to"
domain-slug: domain/context-push
---

# Claim

A line that fully answers the question a reader is asking stops them reaching the document that states how the act is done, even where a pointer to it stands beside the line.

The reader does not skip the pointer. They never get as far as needing it: the sentence they met reads as complete, so the question that would have made them judge the pointer relevant has already been answered.

# Evidence

Two agents, 2026-08-24, on one sentence.

`pages/page-type/initiative.md` carries as Design: "An initiative is deleted once the intent it quotes is met." That sentence states a condition for deletion, mentions no ordering and no principal, and reads as a complete instruction. The ordering lives in `pages/task/review-initiative.md` step 5 — read the domain against what stands, carry the closing to Alan with every quoted line and the reading that resolved it, delete last — because an initiative closes on the lines it quoted, and those are rarely the whole gap.

`initiative.md` already carries `conditional-reading-slugs: [define-initiative, review-initiative]` — the pointer stands in the frontmatter of the document both agents read.

Both took the wrong order from the Design line. One deleted an initiative before carrying the closing, at `bb99c410` in the memory repo, having never opened `review-initiative.md`. The second held the same inversion and would have repeated it; she checked her own read record rather than introspecting, and it returned `review-initiative.md` NEVER READ against `initiative.md` read at 18:48, with a control showing the query returns present for a task page she had read. She held the wrong order before any conversation that could have supplied it.

Not measured. Whether either would have followed the pointer had the Design line been absent is untestable after the fact. I did not survey other page types for complete-sounding Design lines over conditional-reading pointers, so nothing says how common the configuration is. Population is two, both on one sentence, so this is one sentence's fault as much as a shape.

A third case of a required document not being reached is deliberately not counted, its mechanism being different: `check.md:30` carries "Every check lands at zero violations", and I proposed a ratcheted check having read `instrument.md` and not `check.md`. No pointer was defeated — the answer sat one level below the document my question sent me to.
