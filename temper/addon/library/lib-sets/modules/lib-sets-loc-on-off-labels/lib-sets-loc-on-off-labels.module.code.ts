import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-item-browser-strings/eso-item-browser-strings.type-declaration.d.ts"

export const BOOLEAN_TO_ON_OFF: { [onOff: string]: string } = {
  [tostring(false)]: string.upper(GetString(SI_CHECK_BUTTON_OFF)),
  [tostring(true)]: string.upper(GetString(SI_CHECK_BUTTON_ON)),
}
