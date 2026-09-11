import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theTwoSkyshardSkillPanelsAreNearCompleteDuplicates = {
  id: "01a06c31-1b01-7000-b602-000000000002",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "the-two-skyshard-skill-panels-are-near-complete-duplicates",
  domain: "domain/temper",
  claim:
    "The console skyshard skill panel and the pc one are near-complete duplicates, differing only in where each keeps its count, and one guard in the pc panel is a no-op. Merging them would also end the setSSP refusal, but whether that is right depends on whether the two panels are meant to share state, which is a design call rather than a fold.",
  evidence:
    "Found on 2026-09-11 while folding the temper band of no-rule-in-two-files, by an agent working under seat thea, and reported rather than acted on because it is wider than a fold.\n\nskyshards-console-skill-panel and skyshards-pc-skill-panel carry the same constants, the same SSP flag, the same counter and the same post-hook, and both hook GAMEPAD_SKILLS. The one real difference is where the count is kept: the console panel puts it in CONSOLE_STATE and the pc panel in module-level let bindings. The pc panel additionally guards on numSkyshards !== 0, which is a no-op.\n\nThe refusal this bears on is setSSP, 2 sites, one in each panel. Each panel writes its own module-level SSP. It was left refused on the reasoning that the differing name is a variable being written rather than a value the rule can be handed, so a single home would turn two panels' flags into one flag. That reasoning is sound while the panels are two things. It stops being sound if the panels are one thing written twice.\n\nSo what the merge depends on is not a naming question. It is whether a player on console and a player on pc are looking at one panel with two front ends, in which case one flag is correct and the duplication is the fault, or at two panels that happen to have been written alike, in which case setSSP stays refused and the duplication is intended.\n\nNothing here judges which. The two panels have not been read against what the game shows a player on each platform, and that reading is what would settle it.",
} as const satisfies Finding
