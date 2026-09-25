import { type Answer, telling } from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  pageRenamed,
  type Asked as Renaming,
} from "akasha/change/modules/page-renaming/page-renaming.module.code.ts"
import { carrying, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { survivingSaid } from "akasha/change/modules/spelling-outliving/spelling-outliving.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export type Asked = Renaming & { readonly spellingsNamed?: boolean }

export function runChange(world: World, given: Asked): Answer {
  const said = pageRenamed(world, given)
  const was = partedIn(given.at)?.slug ?? null
  if (said.refused !== null || given.spellingsNamed === true) return said
  if (was === null || was === given.to) return said
  return telling(said, survivingSaid(carrying(world, said), was))
}
