import type { Adding } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { besideAt, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  type Typed,
  typedWith,
} from "akasha/page/type/modules/type-generating/type-generating.module.code.ts"
import { turnedInto } from "akasha/story/game/game-panel/modules/panel-turning/panel-turning.module.code.ts"

const PANEL = "game-panel"

const CODE = "code"

const TSX = "tsx"

const DRAWN = "drawn"

const JS = "js"

export function couldTurn(change: Change): boolean {
  for (const path of change.changed) {
    const said = partedIn(path)
    if (said !== null && said.pageType === PANEL) return true
  }
  return false
}

export function generateChange(change: Change): Typed {
  return typedWith(change, "game-panel-drawing", generateTypes)
}

function generateTypes(_root: string, shadow: Shadow, change: Change): readonly Adding[] {
  const written: Adding[] = []
  for (const listed of shadow.index.everyOfType(PANEL)) {
    const code = besideAt(listed.path, CODE, TSX)
    const at = besideAt(listed.path, DRAWN, JS)
    if (code === null || at === null) continue
    const text = textOf(change.after(code))
    if (text === null) continue
    written.push({ kind: "add", path: at, content: turnedInto(text) })
  }
  return written
}
