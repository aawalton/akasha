import type { Finding } from "../finding.page-type.ts"

export const carryingAUiPackageNarrowedItsWaysInFromAWildcardToNine = {
  id: "01a0637e-9508-7373-bfb1-54a983ee941c",
  pageTypeSlug: "finding",
  slug: "carrying-a-ui-package-narrowed-its-ways-in-from-a-wildcard-to-nine",
  domainSlug: "domain/temper",
  claim:
    "Carrying `player-inventory-management-ui` into akasha as 111 modules lost three things a reader could have wanted: a wildcard export that let anything reach anything, one named way in nobody used, and twenty-six identifiers the naming checks would not admit. None was noticed by a typecheck, because each is legal TypeScript either way. The old manifest was also wrong in both directions about what the package reaches.",
  evidence:
    "The old manifest named five exports plus `./*`, so all 111 files were reachable from outside; the akasha manifest names the nine subpaths the two consumers actually import, measured over `temper/web` and `temper/player-economics-ui`. `pricing-source-note` was an explicit export of the old manifest and is reached by no consumer, so it is now internal. The old manifest declared `recharts` and `@akasha/design-system`, which no file imports, and did not declare `@akasha/design-badges` or `@akasha/design-forms`, which 52 and 7 import sites reach. Twenty-six names were changed to land: eleven functions returning JSX went to upper camel, of which `entityRulesPanels` and `itemRulesPanels` were exported and reached only from inside; nine module constants in `item-tooltip` went to upper snake; six function-local constants written in upper snake went to lower camel. One unused loop variable, `_item` in `pricing-source`, was replaced by an emptiness test rather than renamed. The package holds no test file, so no bunfig came across and none is owed.",
} as const satisfies Finding
