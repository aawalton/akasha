import { gathered, refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const REMOVE_FILE = "change-mechanical-file/remove-file"

export type Asked = {
  readonly at: string
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const under = [...world.under(given.at)].sort()
  if (under.length === 0) {
    return refusing(`\`${given.at}\` holds no file, so nothing is taken away`)
  }
  const taken: Answer[] = []
  let seen = world
  for (const one of under) {
    const said = await reach(seen, REMOVE_FILE, { at: one })
    if (said.said.refused !== null) return said.said
    taken.push(said.said)
    seen = said.world
  }
  return gathered(taken)
}
