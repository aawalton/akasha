import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theTwoSkyshardSkillPanelsAreNearCompleteDuplicates = {
  id: "01a06c31-1b01-7000-b602-000000000002",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "the-two-skyshard-skill-panels-are-near-complete-duplicates",
  domain: "domain/temper",
  claim:
    "The console skyshard skill panel and the pc one are near-complete duplicates, differing only in where each keeps its count, and one guard in the pc panel is a no-op. The setSSP refusal that bore on them is gone, both panels now reading one shared flag, so whether to merge the panels is a design call of its own rather than one a refusal forces.",
  evidence:
    "Found on 2026-09-11 while folding the temper band of no-rule-in-two-files, by an agent working under seat thea, and reported rather than acted on because it is wider than a fold.\n\nskyshards-console-skill-panel and skyshards-pc-skill-panel carry the same constants, the same counter and the same post-hook, and both hook GAMEPAD_SKILLS. The one real difference is where the count is kept: the console panel puts it in CONSOLE_STATE and the pc panel in module-level let bindings. The pc panel additionally guards on numSkyshards !== 0, which is a no-op.\n\nThe refusal this bore on was setSSP, 2 sites, one in each panel, each panel writing its own module-level SSP. That is folded: both flags held one fact about the running client, whether its skill-point manager can report a total, so the fact was given one home in skyshards-skill-point-total, which both panels read and both loaders set. The refusal went without the panels being merged.\n\nSo what the merge depends on is not a naming question, and no longer a refusal. It is whether a player on console and a player on pc are looking at one panel with two front ends, in which case the duplication is the fault, or at two panels that happen to have been written alike, in which case the duplication is intended.\n\nNothing here judges which. The two panels have not been read against what the game shows a player on each platform, and that reading is what would settle it.",
} as const satisfies Finding
