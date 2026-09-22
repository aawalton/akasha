import { asPresent } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { applyDefaultLayout } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-set-text-default-layout/sets-set-text-default-layout.module.code.ts"
import { fillSetInfoParts } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-set-text-set-info-parts/sets-set-text-set-info-parts.module.code.ts"
import { collectSetTextFields } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-set-text-set-text-fields/sets-set-text-set-text-fields.module.code.ts"
import { asSetInfoPartMap } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-tip-casts/sets-tip-casts.module.code.ts"
import { applyCustomTooltipPattern } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-tip-set-data-text-custom/sets-tip-set-data-text-custom.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-tip-state/sets-tip-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-4/sets-search-ui-shapes-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"

export function buildSetDataText(
  this: void,
  setData: { [key: string]: unknown },
  itemLink: string | undefined,
  forTooltip?: boolean
): LuaMultiReturn<[string, { [part: string]: SetsSetInfoPart }, string]> {
  if (setData === undefined) {
    return $multi(
      asPresent<string>(undefined),
      asPresent<{ [part: string]: SetsSetInfoPart }>(undefined),
      asPresent<string>(undefined)
    )
  }
  if (setData["setId"] === undefined) {
    d(lib.prefix + "ERROR buildSetDataText - setId missing: " + tostring(itemLink))
    return $multi(
      asPresent<string>(undefined),
      asPresent<{ [part: string]: SetsSetInfoPart }>(undefined),
      asPresent<string>(undefined)
    )
  }
  const forTooltipResolved = forTooltip ?? false

  let setInfoParts: { [key: string]: unknown } | undefined = {}
  if (forTooltipResolved === true) {
    setInfoParts = undefined
  }

  const fields = collectSetTextFields(setData, itemLink, forTooltipResolved)

  if (STATE.useCustomTooltip === true) {
    applyCustomTooltipPattern(fields)
  } else {
    applyDefaultLayout(fields)
  }

  if (!forTooltipResolved) {
    fillSetInfoParts(setData, fields, setInfoParts)
  }

  return $multi(
    asPresent(fields.setInfoText),
    asSetInfoPartMap(asPresent(setInfoParts)),
    asPresent(fields.setInfoTextNoTextures)
  )
}
lib.BuildSetDataText = buildSetDataText
