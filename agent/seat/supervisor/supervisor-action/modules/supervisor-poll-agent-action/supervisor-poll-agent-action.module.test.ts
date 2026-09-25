import { expect, test } from "bun:test"
import { ACTIONS } from "akasha/agent/seat/supervisor/supervisor-action/modules/supervisor-poll-agent-action/supervisor-poll-agent-action.module.code.ts"
import { supervisorAction } from "akasha/agent/seat/supervisor/supervisor-action/supervisor-action.page-type.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

test("the actions a seat can be asked to take are every supervisor-action page", () => {
  const root = rootFor(resolveRoots(), AKASHA)
  const pages: string[] = valuesOfType(root, supervisorAction.slug).flatMap((one) => {
    const named = partedIn(one.path)
    return named === null ? [] : [named.slug]
  })

  const actions: string[] = [...ACTIONS]

  expect(actions.sort()).toEqual(pages.sort())
})
