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
