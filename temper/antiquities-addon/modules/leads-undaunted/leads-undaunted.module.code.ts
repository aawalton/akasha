export function getPledgeDungeons(): UndauntedPledgeDungeon[] | undefined {
  if (UndauntedDaily === undefined) {
    return undefined
  }
  return UndauntedDaily.GetPledgeDungeons()
}
