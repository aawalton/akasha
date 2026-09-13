import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import {
  type Reaching,
  type World,
  worldAt,
} from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { loadedAt } from "akasha/changes/runners/modules/change-loading/change-loading.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"

let filed: World | null = null

function filedWorld(): World {
  if (filed === null) filed = worldAt(rootOf(import.meta.dir), () => null)
  return filed
}

export async function running(world: World, at: string, given: unknown): Promise<Answer> {
  const loaded = await loadedAt(filedWorld(), at)
  if (typeof loaded === "string") return refusing(loaded)
  return await loaded.run(world, given)
}

export function listing(seen: string[]): Reaching {
  return (_world, at) => {
    seen.push(at)
    return Promise.resolve(stating([]))
  }
}
