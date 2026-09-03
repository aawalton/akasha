import type { StoryDecision } from "../../story-decision.page-type.ts"

export const decisionCh1FirstHarvest = {
  id: "01a0657d-bb96-70d2-8ff0-62287fefc2ec",
  pageTypeSlug: "story-decision",
  slug: "decision-ch1-first-harvest",
  title: "First Harvest — Colette Vane (ch1)",
  worldSlug: "the-beholder",
  chapterNumber: 1,
  decisionType: "stat",
  options:
    "**① Her Beauty — +10% Allure**\nColette's Allure 16.0 → Pearl 14.0 → **15.6**. Presence; social leverage. (Reader's pick.)\n\n**② Her Grace — +10% Celerity**\nColette's Celerity 15.0 → Pearl 11.0 → 12.5. Speed; reflexes, evasion.\n\n**③ Her Eye — +10% Acuity**\nColette's Acuity 13.0 → Pearl 12.0 → 13.3. Perception; precision, target-read.",
  chosen: "① Her Beauty — +10% Allure",
  effect:
    "Allure 14.0 → 15.6 (+1.6 = 10% of Colette Vane's Allure 16.0), permanent and stacking. No level gain — levels removed; theft is the sole axis of growth. Celerity and Acuity left to cool on the floor. (Decision predates the system retcon: original menu offered a \"Read the Room\" skill as ③; under the two-category model that option is now Acuity. The reader's Allure pick is unchanged.)",
  prose: "txt",
} as const satisfies StoryDecision
