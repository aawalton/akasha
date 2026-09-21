import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function resolveCharacterNameById(charId: string): string | undefined {
  const numCharacters = GetNumCharacters()
  for (let i = 1; i <= numCharacters; i++) {
    const [rawName, , , , , , id] = GetCharacterInfo(i)
    if (id === charId) {
      const name = zo_strformat("<<1>>", rawName)
      return name !== "" ? name : undefined
    }
  }
  return undefined
}
