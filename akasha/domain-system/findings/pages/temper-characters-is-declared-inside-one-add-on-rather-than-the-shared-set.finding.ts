import type { Finding } from "../finding.page-type.ts"

export const temperCharactersIsDeclaredInsideOneAddOnRatherThanTheSharedSet = {
  id: "01a06181-d385-735d-a801-c98d3dd7da5a",
  pageTypeSlug: "finding",
  slug: "temper-characters-is-declared-inside-one-add-on-rather-than-the-shared-set",
  domainSlug: "domain/temper",
  claim:
    "The `TemperCharacters` global is declared in a private `declare global` inside `akasha/temper/temper-companions-addon/companions-declarations`. A second add-on that needs it cannot add its own declaration: two private copies collide at TS2451 and neither write refuses on its own. The crafting recreation needed a richer view of the same global and had to narrow the companions declaration by cast rather than declare what it reads.",
  evidence:
    "Writing `temper-characters-global` into `temper-addon-library-types` was refused with `TS2451: Cannot redeclare block-scoped variable 'TemperCharacters'` at `companions-declarations.module.code.ts` line 132, together with TS2687 and TS2717 on the merged `characters` field. The two shapes disagree rather than overlap: companions declares `characters: Record<string, { companionRapport?: Record<number, number> }>` and required window calls `HideWindow`, `ShowWindow`, `ToggleWindow`, `scheduleTaskAutoCompletionCheck` and `TabManager`; crafting reads `skillLineProgress`, `skillPoints` and `mountTraining`, and treats the global as `| undefined`. Making the shared declaration a superset breaks companions at nine call sites that reach `TemperCharacters.TabManager` with no undefined check. The move wants both packages changed in one commit.",
} as const satisfies Finding
