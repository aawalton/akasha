---
id: c5d3bfb4-c402-55bc-8eac-d67dab4b1904
slug: control-arm-lost-material-mid-rep
page-type-slug: finding
title: "Control arm lost material mid rep"
domain-slug: domain/case
---

# Claim

Project #17388 (domain `case`) ran one rep of the case mechanism #17368 built against mined failures, and found that the control arm's system prompt had lost the repository material it was meant to measure since commit `9cef125e` deleted this repo's root CLAUDE.md on 2026-07-31, leaving the one existing case (from `918b72e5`) an unmeasured verdict rather than a comparable one.

# Evidence

Project #17388, domain `case`. Built on #17368 (schemas, verbs, blinded roles, three-arm design; carried one case through them) — parts compose, but unmeasured: cost per rep, how often a rep dies on an instrument fault vs. reaching a verdict, which steps need a person present. Every defect found building it (a transcript path the CLI never writes, an arm authenticating as the one spent account, a judge one edit from unblinded) was found by running it, not reading code — reps are the only instrument for that class.

Runs mined failures (`bun tools/failures.ts`, blind to principle) through the mechanism for the reps, not the principles; units confirmed/refuted are a by-product. Each rep is a child row carrying its cost and change. Closes on Alan's judgment a rep is routine: reps no longer changing the machinery. Document: `instructions/initiatives/case-reps.md`.

[2026-07-31T18:57:42.338Z] REP 1 — no case landed; worth more than one. FOUND: the control arm had stopped measuring anything — commit `9cef125e` deleted this repo's root CLAUDE.md at 11:43 on 2026-07-31, hours after the only case ran, at `918b72e5`. A control run then held the account's access and no repository material, while every arm ran and a verdict came back ordinary; marginality went unmeasured while still reported. FIXED: the material is now composed and handed to each arm as a system prompt rather than discovered from cwd, via `tools/lib/case-estate.ts`, `tools/lib/case-seat.ts` (all three arms' seating in one place), and a new `governsTree()` function in `tools/lib/governs.ts`. CONSEQUENCE: the one case on record (value, negative) is not comparable to later ones. HELD (Alan): code-repo transcripts stay refused — the guard returns one document, so control there would be thin enough to manufacture confirmations; reopens as #17367. ALSO OPEN: nothing on a case says which seating produced it — preflight pins and ablates but does not compose, so seating cannot preview before spending. 242 tests pass; composition checks green
