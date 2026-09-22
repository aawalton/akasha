import "akasha/temper/addon/pages/world/antiquities/leads-undaunted-declarations/leads-undaunted-declarations.type-declaration.d.ts"

export function getPledgeDungeons(): UndauntedPledgeDungeon[] | undefined {
  if (UndauntedDaily === undefined) {
    return undefined
  }
  return UndauntedDaily.GetPledgeDungeons()
}
