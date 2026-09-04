import type { Finding } from "../finding.page-type.ts"

export const theCompletionHooksOwedToTheWebBelongToTheSiblingPackageRatherThanTheAddOn = {
  id: "01a062f1-b8c8-7020-9263-0e48bc02792c",
  pageTypeSlug: "finding",
  slug: "the-completion-hooks-owed-to-the-web-belong-to-the-sibling-package-rather-than-the-add-on",
  domainSlug: "domain/temper",
  claim:
    "The completion work listed as owed by the recreations — the `use-completion` hooks and the transform and summary functions — belongs to `temper/player-completion`, not to `temper/player-completion-addon`. Handing it to the add-on's migration leaves it unowned, because the add-on states none of it. The add-on is an ESO Lua add-on compiled by TypeScriptToLua and the hooks are browser code; the two never shared a file.",
  evidence:
    "Measured at `c7c8660094`. Nine named functions were counted in three populations at once, so each row carries its own control. `useAccountCompletion` and `useCompletionCharacters` score 0 in the add-on and 0 in `temper/player-completion`, occurring 9 and 17 times elsewhere under `temper/`. `transformQuestProgress`, `transformPoiProgress`, `transformCadwellProgress` and `buildAccountSummary` each score 0 in the add-on and 3 in `temper/player-completion`. `sumAccountScope` and `getTabForCard` score 0 and 2, and `characterAchievementData` scores 0 and 6. Every add-on column is zero and no other column is, so the instrument was finding things when it returned those zeros. A compiler parse of all 95 of the add-on's TypeScript sources separately found 34 external specifiers, none reaching a hook or a transform.",
} as const satisfies Finding
