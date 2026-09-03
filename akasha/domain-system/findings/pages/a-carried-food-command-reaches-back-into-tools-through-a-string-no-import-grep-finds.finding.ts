import type { Finding } from "../finding.page-type.ts"

export const aCarriedFoodCommandReachesBackIntoToolsThroughAStringNoImportGrepFinds = {
  id: "01a06868-09fc-7000-b081-531d16004102",
  pageTypeSlug: "finding",
  slug: "a-carried-food-command-reaches-back-into-tools-through-a-string-no-import-grep-finds",
  domainSlug: "domain/akasha-migration",
  claim:
    "The carried `food` command still runs on `tools/lib`, and one of its three reaches is spelled as a string constant fed to a dynamic import, so a lane grepping for import statements before ablating `tools/lib` will not see it.",
  evidence:
    "akasha/command-system/commands/food/food.command.code.ts line 52 holds `const NUTRITION_POINTS = \"@tools/lib/daily-tracking/nutrition-points\"`, and lines 284-285 do `await import(NUTRITION_POINTS)` then `nutrition.rollupNutritionForDay(dayStr)`. Only the static reaches on lines 5-7 \u2014 `@tools/lib/eso-day`, `@tools/lib/page-query-client`, `@tools/lib/wake-day` \u2014 answer a grep for `^import`. The command's own failure text at line 290 reads 'The day's roll-up did not finish; a nutrition sync over ${dayStr} redoes the whole of it.', so a live akasha command names an unmigrated ops command as its repair path. tools/lib/daily-tracking/{nutrition-points,strength-points,task-points}.ts import nothing from @akasha/ at all, so that computation has not begun to carry.",
} as const satisfies Finding
