---
id: 78194f9b-0b23-52e2-bcfc-1505ddf76b46
slug: four-automations-that-never-became-files-were-retired-deliberately
page-type-slug: finding
title: "The four automations that never became files were each retired deliberately"
domain-slug: domain/global
---

# Claim

Seventeen `automation` rows stand soft-deleted; thirteen carry a file and four do not. The four are not wreckage the file migration left — Alan retired each himself and gave his reason in a commit. Two are now uncarryable, because the action kind and the trigger condition they need were deleted from the code after the rows went. So nothing prompts Alan to take his medication, and that is a choice he made rather than something that was lost.

# Evidence

Verified by me, 2026-08-20, by running the queries and reading the commits.

**2026-07-25, deleted 1.2 seconds apart.** `Meds reminder (morning)` (`019f0f72-…`, enabled, last fired 2026-07-25) sent a spoken nudge via `elaine` when Alan was at his desk and had not logged his dose. `Aelwyn morning ritual at 6am Mountain` (`019eea51-…`, already disabled) nudged the same Vyvanse plus calories and air quality. Alan's commit `eb9b6760e2`, seven minutes after the soft-deletes, names both: "Its two live rows (seq 1026 Aelwyn morning ritual, disabled; seq 1027 meds reminder, firing daily) were soft-deleted first, so no row declared the kind when the code supporting it went away." Both used `send_agent_message`, which that commit deleted. `4d5f2abf12` (2026-08-19, "the meds-adherence complex goes") then deleted `packages/alanwalton/meds` and the `meds-not-taken-today` resolver.

Neither can be rebuilt from its row. `actionSchema` in `code:packages/automation/core/src/pure/parse-automation.ts` holds eight kinds and not `send_agent_message`; the `REGISTRY` in `code:packages/automation/scheduler/src/activity-conditions.ts` holds only `alan-active`, and an unknown condition is treated as unmet. What carries the medication now is the recurring `Vyvanse` to-do at `memory:pages/to-do/vyvanse.to-do.md`, completed on each of the twelve days to 2026-08-19.

**2026-06-19, both enabled.** `Safety level change → segment safety session` (`019e83a7-670c-…`) and `Health multiplier change → segment health session` (`019e83a7-683d-…`) closed the open `session-tracking` page and opened a new one on a level change. The safety half became `ops tracking safety <level>`, which Alan landed the next morning in `499fa77b01`; it ran on 2026-08-20 at 13:45:00Z. The health half has no successor: `healthMultiplier` and `level-health` stand in no repo and in no code-repo commit.
