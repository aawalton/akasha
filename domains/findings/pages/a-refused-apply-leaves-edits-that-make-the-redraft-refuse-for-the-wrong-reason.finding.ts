import type { Finding } from "../finding.page-type.ts"

export const aRefusedApplyLeavesEditsThatMakeTheRedraftRefuseForTheWrongReason = {
  id: "01a08353-7557-71c8-8ed0-da6d9e6d6853",
  pageTypeSlug: "finding",
  slug: "a-refused-apply-leaves-edits-that-make-the-redraft-refuse-for-the-wrong-reason",
  domain: "page-type/change",
  claim:
    "An apply that refuses lands nothing and leaves its edits kept. Those edits shadow the tree, so drafting the same change again reads a world where the source paths have already been renamed away, and the second refusal says a file could not be read. Neither refusal names the kept edits as the cause and neither names `akasha change drop` as the remedy. An agent reading the second refusal at face value looks for a missing file in the tree, where the file is exactly where it should be.",
  evidence:
    "Renaming 249 day pages in five batches of fifty, the fourth batch drafted cleanly and then refused at the apply, because another agent had landed a rename inside one of the pages between the draft and the apply:\n\n`alan/track/days/pages/2026-09-08/wake-day-2026-09-08.day.ts — read against `3f568e9ee2d6d73f95c9af6e8cc6baedc0dab0d5`, and what is at `1090814f5d8bcd7c66957e1338a2dd30fff8aabd` is not what was read`\n\nThat refusal is right and its wording is clear. Nothing was written and the fold was undone. The 282 lines of kept edits were left where they were, at `seat-system/subagents/pages/*.subagent.edits.uncommitted.jsonl`.\n\nDrafting the same batch again then refused:\n\n`alan/track/days/pages/2026-07-22/wake-day-2026-07-22.day.ts could not be read, so no page is renamed`\n\nThat file was on disk and git-tracked the whole time. A draft reads the world as every edit kept before it had already landed, so it read a world in which `wake-day-2026-07-22.day.ts` had already become `day-2026-07-22.day.ts` and there was no `wake-day-` file left to rename. The message describes the symptom in the shadowed world rather than the cause in the kept edits, and it names no remedy. The remedy is `akasha change drop`, which lands nothing and takes the kept edits away, after which the same draft goes through. A draft that refuses, by contrast, keeps nothing, so only a refused apply leaves this trap.",
} as const satisfies Finding
