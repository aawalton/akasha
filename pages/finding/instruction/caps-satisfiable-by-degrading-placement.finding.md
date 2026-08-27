---
id: 89705d6b-843e-5c57-abca-58586f46dbce
slug: caps-satisfiable-by-degrading-placement
page-type-slug: finding
title: "Caps satisfiable by degrading placement"
domain-slug: domain/global
---

# Claim

Three instruction documents hit their length caps in one project because dissolving a shared document routes material to the axes that already own the most of it: `~/instructions/docs/domain-first-agents.md` (199/200 lines), `~/instructions/docs/persona-skill-surface.md` (199/200 lines), and `~/instructions/skills/lead/SKILL.md` (at its 5000-token ceiling). At a cap, three of an agent's four moves degrade fact placement rather than restructure correctly.

# Evidence

Project #17307, domain `instruction`, status someday_maybe, live-on commit. Captured, never defined.

Diagnosis: a project dissolving a shared document routes its material to the axes that own it, and the documents owning the most material are already the fullest — doing the right thing is what drives destinations into their caps.

Three instances: `~/instructions/docs/domain-first-agents.md` at 199/200 lines — the layer-model document four role skills route to, filed by worker-17271 against its own four-line edit. `~/instructions/docs/persona-skill-surface.md` at 199/200 lines — split into two docs by #17277 at a seam its own section headings already carried. `~/instructions/skills/lead/SKILL.md` at its 5000-token ceiling — currently the block forcing an ordering constraint between two live trees.

What is wrong: not that the cap binds (satisfiable, and was satisfied twice) — the price is wrong. At the cap an agent has four moves: split at a real seam (correct), put the fact where it fits rather than belongs, compress a neighbouring paragraph, or leave it unwritten. All four are green. The correct move is the only restructuring the worker did not come for, so it is the most expensive and least likely to be taken mid-task. A check satisfiable by a route that degrades what it protects condemns the check, not the agent taking the cheap route.

Not Cap the Free Variable — the holder CAN spend less; every compliant edit lies outside the worker's task scope. Not a request to raise caps — a cap that never binds protects nothing, and the two split documents are better for having split.

Held open at exploration: whether the domain needs this is not settled — the codebase ran long with per-file caps and this is the first project to hit three at once. The deciding measurement is what the caps protect: an agent's boot load is the sum of what it loads, and no instrument reports that.

Moved off the row's retired `notes` attribute on 2026-08-15.
