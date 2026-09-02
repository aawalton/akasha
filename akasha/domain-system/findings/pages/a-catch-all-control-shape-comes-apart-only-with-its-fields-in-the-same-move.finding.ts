import type { Finding } from "../finding.page-type.ts"

export const aCatchAllControlShapeComesApartOnlyWithItsFieldsInTheSameMove = {
  id: "01a06289-e1e2-705d-8a40-5611878770ed",
  pageTypeSlug: "finding",
  slug: "a-catch-all-control-shape-comes-apart-only-with-its-fields-in-the-same-move",
  domainSlug: "domain/temper",
  claim:
    "No refusal names `LamWidgetControl` any more, and `temper-lib-addon-menu` is at 46 of its own against 122 this morning. Moving its members onto the shared control kinds alone made things worse, 114 to 119, because TS2740 and TS2339 trade against each other. Only that move together with giving every field and every creation call its true kind closed it.",
  evidence:
    "Measured 2026-09-02 with `skipLibCheck` off, against the baseline of 8 the default DOM lib costs the harness.\n\nEach step measured: 122; 114, ten documented members joining `eso-ui-extra` at `203b9433fc`; 119, `LamWidgetControl` reduced to its three own members; 114, 23 `LamControl` fields given their kinds; 85, a type argument on 13 `CreateControlFromVirtual` calls; 65, `IconControl` and `FaqTextureControl` rebased on `TextureControl`; 56, `CT_SLIDER` branded at `c8b9ba9b5c`. TS2740 fell from 42 to 2.\n\n`CreateControl` takes no type argument, being an intersection of overloads. A seat measured that and recorded it of `CreateControlFromVirtual` too, which is declared `<T extends Control = Control>` and does take one. Reading the first result as settled for the neighbour hid 29 refusals.\n\nEvery member went where `ESOUIDocumentation.txt` puts it, read off the `h3.` heading above it. `SetResizeToFitConstrains`, `SetResizeToFitPadding` and `SetHitInsets` belong to `Control`, not to `LabelControl`. Field kinds came from the creation call, or for a virtual from the element the game's XML gives that template.\n\nWhy it does not land, from `akasha write --dry-run`: 7 declarations disagreeing with `temper-lib-scrollable-menu`; 34 pages no parent names, there being no package page, `package.json` or addon manifest yet; 60 typecheck lines; 4 invariants joining a second fact at a comma.\n\nThe recreated tree is at `scratchpad/lamseat2/work/`, its overlay list beside it in `workargs.txt`, 76 refusals ahead of the `scratchpad/lam-seat/tcview/` a reader resumes from otherwise.",
} as const satisfies Finding
