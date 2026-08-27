---
id: 49e3392a-c4a9-55bc-a2db-58c226140463
page-type-slug: finding
title: "Restraint artefact subject clause already landed"
domain-slug: domain/global
---

# Claim

The "third clause" proposed for the "Check the Restraint" pattern in Global Principles — that an artefact only discharges the check if its subject is the belief — was already landed doctrine under "Observation over Inference" before the proposal was filed.

# Evidence

Proposed refinement to "Check the Restraint" (~/.claude/CLAUDE.md, under Understanding, landed 2026-07-25), filed as a reviewable proposal since principles are Alan's authority.

Original evidence: within ~2 hours of landing, two personas stress-tested it in opposite directions. awen: an artefact (row status, a commit's file list, game dates) was one command away and she never looked; her watch had fired 13 days earlier while she called it "still waiting" — verdict: act. sophia: Alan's alanNotes had been wiped; she held the pre-wipe content and `ops page revert`; whether the clear was deliberate was not a fact any row carried — verdict: route to him. He answered "I cleared it deliberately, leave it."

Gap: read naively the pattern biases toward action. Proposed discriminator: not caution, but "is there something that could disagree with me, and did I look." Routing to Alan was the test correctly executed.

Proposed third clause, tied to a separate failure family the same night: the artefact must be ABOUT the belief. ~12 errors between echo, athena and the filer came from true artefacts about a different object — a GPU count with no VRAM data; a pod creationTimestamp dating a Deployment that predated it by a month; a commit subject "20Gi" whose diff was actually a reduction; a two-dot diff answering "how do these differ" for "what did this branch change," reporting 1.6M deletions on a zero-commit branch.

Retraction, 2026-07-25T11:55:28.866Z: the third clause was already landed doctrine under "Observation over Inference" (cited by awen as a #15919 edit), verbatim in substance — "Name the belief's object before looking, then check that what you watched is that object... a true statement whose subject has quietly moved survives re-applying the rule and is caught only by re-reading it." The filer's dozen field instances are the clause failing in practice, not a motive for new text. Project #16095, status someday_maybe, live-on: commit, domain principle.
