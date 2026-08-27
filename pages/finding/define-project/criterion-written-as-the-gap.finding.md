---
id: 735bbff8-44bb-52c6-a79b-0964b382e053
page-type-slug: finding
title: "Criterion written as the gap"
domain-slug: domain/global
---

# Claim

`define-project.md:24` says "State the end state and never the method", and a definer who reads it writes the gap and believes they complied — the line's whole contrast is with METHOD, so a description stating the defect that stands is not what it warns against. `domains/memory.md`'s End State rule is the one that binds it, and define-project neither carries it nor cites it. Nothing between definition and hand-back tests it, so it surfaces at verification, by which point the box is ticked.

# Evidence

Found verifying three hand-backs on 2026-08-10 as lead of tree #18484. Two of the three carried it.

#18353 criterion 2 read: "Its header argues the cached graph is a universal superset trimmed by a filter, and the cached path is measurably the smaller of the two." The repair makes the second clause false, so the ticked box states the defect as the reason it was met. It reached hand-back that way, with both boxes also left unticked.

#18356 carried both criteria in gap form at dispatch — "The summary sits after the exit-1 branch, so a red run reports how many deployables it built to nobody" — and the DELIVERING seat rewrote both into end-state form mid-flight, then said so. So the defect is being caught downstream, by seats spending a decision on it, rather than at the point of writing.

#18367's two criteria were written as end states at dispatch and needed nothing. Same definer, same day, same initiative.

The two documents pull in the same direction and only one is reachable from the task: `define-project.md:24` contrasts end state with METHOD, which is a different failure and the one a definer will believe they have avoided. `domains/memory.md` End State is the binding rule and define-project does not cite it. `verify-handback.md` says nothing about a description that stops being true once its box is ticked, which is where I met it.

NOT MEASURED: how many of the 55 children of #18484, or of the wider project corpus, carry a gap-form description today. I read three documents and fixed one. Whether the same shape appears outside this initiative or this definer is unmeasured, and one definer over one day is not a population.
