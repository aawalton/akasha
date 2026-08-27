---
id: 3a6bfd5a-0eb6-5818-b113-42bec2b2e952
page-type-slug: finding
title: "Objective checkbox has no writer"
domain-slug: barred-meaning/project
---

# Claim

No task names a writer for an objective's checkbox. The build tasks say to hand back, `verify-handback` says to pass a project on where every criterion is met, and neither says who marks the box — so a seat reports its objectives met in a message while the document has never carried a tick. The two records disagree and only a manager reading both catches it. `review-initiative` and `review-theme` both rely on the unticked box reporting what is missing, which an unwritten box cannot do.

# Evidence

Measured on 2026-08-10 across eight hand-backs verified as manager of tree #18484.

Three arrived with every box unticked while the seat's hand-back message asserted otherwise: #18353, #18443 and #18414. #18443's message opened "BOTH CRITERIA MET AND VERIFIED BY RUNNING"; #18383's said its objectives were "met and ticked on the document".

I checked the obvious alternative first — that something strips ticks on write — and it does not. Walking every revision of each document and counting `^\[x\]`: #18414 carries 0 at all six revisions before verification; #18443 carries 0 at every revision until `e3e028ee`, which is my own write; #18353 the same until `a5e123d5`, also mine. No revision has ever held a tick that a later one lost. The seats did not tick and the machinery did not unmark.

Swept `domains/tasks/` for an instruction to mark one: six hits on `tick`, none of them this. `ship-install.md` twice describes criteria "left unticked" for something only a real device shows, and `review-initiative.md` and `review-theme.md` each say "The unticked box already reports what is missing" — three documents reading the box as a live signal, and none naming who writes it. `tools/document/schemas/project.ts` levies the checkbox's shape and says nothing about who marks it.

NOT ESTABLISHED: whether the other five hand-backs arrived ticked because their seats chose to or because their definers created them that way. Whether this holds outside this tree, this initiative or this day — eight projects under one manager is not a population. Whether a seat that ticks its own boxes is even wanted, whether the mark belongs to the verifying seat instead, and which of those the estate intends.
