import type { Finding } from "../finding.page-type.ts"

export const fiveOrderListBoxCallsSetTheParameterBesideTheOneTheyMeant = {
  id: "01a062c3-06b5-7b39-9cdd-78c3994658fe",
  pageTypeSlug: "finding",
  slug: "five-order-list-box-calls-set-the-parameter-beside-the-one-they-meant",
  domainSlug: "eso-addon/temper-lib-addon-menu-order-list-box",
  claim:
    "Five calls pass `true` believing they set `reselectingDuringRebuild`, and the game reads it as `animateInstantly`. Both are optional booleans in the corrected declaration, so nothing type-errors and no emitted Lua moves. What the widget does in the client is therefore open, and only whoever owns it can settle it.",
  evidence:
    "`ZO_ScrollList_SelectData(self, data, control, reselectingDuringRebuild, animateInstantly)` is at line 1654 of `esoui/libraries/zo_templates/scrolltemplates.lua`, in the checkout at 990654b6b5 that `eso-paths.module.code.ts:57` resolves. Lines 1659-1660 default `reselectingDuringRebuild` to false when nil, line 1667 gates the whole body on `notAlreadySelected or reselectingDuringRebuild`, and lines 1668-1669 default `animateInstantly` to false.\n\nThe transposed declaration is `temper/shared-addon-libraries-lib-addon-menu-order-list-box/src/types/eso-ext.d.ts:20`, naming `animateInstantly?: unknown` fourth and `reselectingDuringRebuild?: boolean` fifth. It is the pre-migration copy and is there yet. `eso-scroll-list-extra.type-declaration.d.ts:5` carries the game's order and is what the recreated package compiles against; it took that order at 7523a56eb2.\n\nFive calls pass `(list, data, undefined, undefined, true)`: `order-list-box-list-methods.module.code.ts` 230, 239, 257, 266 and `order-list-box-drag-methods.module.code.ts:151`. The built Lua at `temper/addons/dist/LibAddonMenuOrderListBox/LibAddonMenuOrderListBox.lua` 473, 1115, 1125, 1140 and 1150 passes `nil, nil, true`, so the fifth slot has always held it.\n\nThe game therefore gets `animateInstantly` true and `reselectingDuringRebuild` false. Where the moved row is already the selected data the reselect the author asked for is skipped; where it is not, the unselect merely animates instantly.",
} as const satisfies Finding
