import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export function buildGetCharacterCurseState(): (
  charId: string
) => "vampire" | "werewolf" | undefined {
  const currentCharStr = tostring(GetCurrentCharacterId())
  const curseType = GetPlayerCurseType()
  let curseState: "vampire" | "werewolf" | undefined
  if (curseType === CURSE_TYPE_VAMPIRE) {
    curseState = "vampire"
  } else if (curseType === CURSE_TYPE_WEREWOLF) {
    curseState = "werewolf"
  } else {
    curseState = undefined
  }
  return (charId) => {
    if (charId !== currentCharStr) return undefined
    return curseState
  }
}
