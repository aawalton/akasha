import type { AddonItemAction } from "akasha/temper/addon/pages/items/modules/inventory-rules-types/inventory-rules-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

const CHARACTER_DESTINATION_PREFIX = "character:"

export function isVendorCrossCharDestination(destination: string | undefined): boolean {
  if (destination === undefined) return false
  if (
    destination.substring(0, CHARACTER_DESTINATION_PREFIX.length) !== CHARACTER_DESTINATION_PREFIX
  ) {
    return false
  }
  const charId = destination.substring(CHARACTER_DESTINATION_PREFIX.length)
  return charId !== tostring(GetCurrentCharacterId())
}

export function isCharacterBoundAction(
  action: AddonItemAction,
  destination: string | undefined
): action is "use" | "research" | "deconstruct" {
  if (action !== "use" && action !== "research" && action !== "deconstruct") return false
  if (destination === undefined) return false
  return (
    destination.substring(0, CHARACTER_DESTINATION_PREFIX.length) === CHARACTER_DESTINATION_PREFIX
  )
}
