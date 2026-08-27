---
id: 67cebe32-ffe4-5a2c-9bc6-dfaa279d90e1
page-type-slug: finding
title: "Merged result cap unpredictable"
domain-slug: domain/global
---

# Claim

A per-branch line-count cap on a shared file (observed on `packages/temper/web/CLAUDE.md`, capped at 200 lines) is a gate whose subject — the merged result, and in fact the exact SHA a merge-queue entry pins — only exists after merge and after queueing, so no per-branch verification can predict it and two independently legal branch changes can still be jointly rejected or land bytes their own author has since superseded.

# Evidence

Project #16223, domain `code-harness`, `someday_maybe`.

2026-07-25T15:51Z: two workers hit this the same day, hours apart, same file. `packages/temper/web/CLAUDE.md` stood at 193 lines against a 200-line cap. #16166 took it to 198; #16055 took it to 197 — both legal alone, only the merged result (202) broke the cap, and the queue ejected one, chosen by batch position, not size/authorship/necessity. The check's subject is the merged result while each agent sees only its own branch, so no care on either branch prevents it, and ejection arrives after CI has spent its time.

Measured: main 193; +#16166 198; +#16055 197; merged 202 ejected. #16055 yielded the file (duplicate route reachable elsewhere), resolving the instance not the class — file sat at 198 after #16166, 2 lines headroom, no signal to the next agent.

Standing do-not-split existed on the file; the filer's own earlier arbitration toward a split was on a stale premise, withdrawn. General shape: any cap on a shared file is a gate whose subject only exists post-merge — per-branch verification can't predict it. Candidates, none chosen: warn at a headroom threshold; evaluate against merge-base projection; surface near-cap files before edit (cheapest, only one reaching agents in time).

2026-07-25T16:16Z sharpened: the merged subject isn't even determined by the branches. Branch project-16166 = 364b6e37; merge-queue entry 10943 references bd0b938f (pre-trim, 198-line); the 198->194 cut lives in cd3e85a, not in that entry. A queue entry pins a SHA; new commits don't update it — landed count is 198 if 10943 lands as-is, 194 if re-queued against cd3e85a. Same class as #16232's stale-queue-entry finding, worse: a stale entry succeeds, landing bytes already superseded, rather than dying loudly. Instance resolved (#16055 yielded, #16166 re-queueing); class not.

2026-07-25T16:26Z (ember): "SPLIT RATIFIED. The checklist finding is the most valuable thing this row produced." Capture cut before further detail.
