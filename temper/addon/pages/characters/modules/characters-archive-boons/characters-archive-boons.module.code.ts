import "akasha/temper/eso/type/eso-api-4/eso-api-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

type ArchiveBoon = {
  abilityId: number
  kind: "verse" | "vision"
  name: string
  description: string
  stacks: number
}

function archiveBoon(abilityId: number, kind: ArchiveBoon["kind"], stacks: number): ArchiveBoon {
  return {
    abilityId,
    kind,
    name: zo_strformat("<<1>>", GetAbilityName(abilityId, "player")),
    description: GetAbilityDescription(abilityId, undefined, "player"),
    stacks,
  }
}

export function archiveBoons(): ArchiveBoon[] {
  const boons: ArchiveBoon[] = []
  if (!IsInstanceEndlessDungeon()) return boons
  const verses = GetNumEndlessDungeonActiveVerses()
  for (let index = 1; index <= verses; index++) {
    boons.push(archiveBoon(GetEndlessDungeonActiveVerseAbility(index), "verse", 1))
  }
  let [abilityId, stacks] = GetNextEndlessDungeonVisionAbilityAndStackCount(undefined)
  while (abilityId !== undefined) {
    boons.push(archiveBoon(abilityId, "vision", stacks ?? 1))
    ;[abilityId, stacks] = GetNextEndlessDungeonVisionAbilityAndStackCount(abilityId)
  }
  return boons
}
