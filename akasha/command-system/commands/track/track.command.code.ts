import type { Answer } from "../../calling/calling.module.code.ts"
import { refused } from "../../calling/calling.module.code.ts"

export function track(): Answer {
  return refused(
    "`akasha track` states what it takes on its page and carries no act yet, and this call did nothing",
    1
  )
}
