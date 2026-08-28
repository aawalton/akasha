---
id: 205bb186-7d5b-5dd3-849d-df533b64290c
slug: rename-landed-deploy-held
page-type-slug: finding
title: "Rename landed deploy held"
domain-slug: domain/temper
---

# Claim

The rename of five Temper community-library ports (LibGPS, LibChatMessage, LibDebugLogger among them) to Temper identity was pre-flighted, implemented and repo-verified — commits `e78bef1d75` (210 files) and `73265d9c94` — with LibGPS2 retired as a zero-consumer legacy global and live SavedVariables migrated by consolidation, but deploy was held fleet-wide on a dispatcher defect, so the work never ran through `project check` or `project deploy`.

# Evidence

Project #16187, domain `temper`, status `someday_maybe`, no objective; moved off retired `notes` 2026-08-15.

Pre-flight complete 2026-07-25T14:26, all gates pass with corrected instruments: unmanaged-dependents clean for all five libraries (positive controls fire). All five manifest keys, prunable, target names free in repo and live SavedVariables tree. Key findings: (1) LibGPS publishes LibGPS3+LibGPS2, not LibGPS; LibGPS2 has zero consumers -> retired. (2) `initialization.ts:36` gates on the literal folder name 'LibGPS' — silent in-game failure risk if missed. (3) LibChatMessage + LibDebugLogger have live SavedVariables written today (DebugLogger = 1.94MB of Alan's real error log) -> consolidation-migration required. (4) LibGPS.lua SV on disk, mtime 2024-08-14, unmentioned in manifest -> pre-Temper orphan. (5) checklist claim "LibDebugLogger is a deletion not a rename" false of the logger API (15 live call sites) -> corrected. (6) DebugLogViewer not installed.

Implementation 2026-07-25T14:39: 9/10 agents landed clean, verified by absence of old token plus controls. LibGPS2 retirement verified precisely. SavedVariables migration proven against a copy of Alan's live data: 2 declaration lines changed, byte-identical body, idempotent re-runs. Reverted one over-reach (tag LCM mistakenly changed to TCM, restored). Deploy held at ember's instruction: CI wedged fleet-wide, athena fixing.

Committed 2026-07-25T14:48: e78bef1d75 (rename, 210 files) + 73265d9c94 (fixup). Deploy still held; no `project check`/`deploy` run.

Verification: 36 survivor lines in 5 files, all legitimate. Over-rename guard: all 16 not-mine tokens still non-zero.

Instrument finding: first verification run reported 0 survivors AND 0 for every control — not a clean repo, a dead command. `grep` is a shell function not exported into script subshells, where GNU grep rejects `--no-ignore-files` and silently matches nothing. Only the controls caught it. Harness rewritten against GNU grep.
