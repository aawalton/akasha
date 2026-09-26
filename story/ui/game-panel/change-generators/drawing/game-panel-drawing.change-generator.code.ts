import type { Adding } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  besideAt,
  pageOf,
  partedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  type Typed,
  typedWith,
} from "akasha/page/type/modules/type-generating/type-generating.module.code.ts"
import { turnedInto } from "akasha/story/ui/game-panel/modules/panel-turning/panel-turning.module.code.ts"

const PANEL = "game-panel"

const CODE = "code"

const TSX = "tsx"

const DRAWN = "drawn"

const JS = "js"

const TS = ".ts"

const PARTED = "/"

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

export function panelsIn(filed: readonly string[], changed: readonly string[]): readonly string[] {
  const found = new Set(filed)
  for (const path of changed) {
    const said = partedIn(path)
    if (said === null || said.pageType !== PANEL) continue
    found.add(`${path.slice(0, path.lastIndexOf(PARTED) + 1)}${pageOf(said)}${TS}`)
  }
  return [...found]
}

function generateTypes(_root: string, shadow: Shadow, change: Change): readonly Adding[] {
  const written: Adding[] = []
  const filed = shadow.index.everyOfType(PANEL).map((listed) => listed.path)
  for (const page of panelsIn(filed, change.changed)) {
    const code = besideAt(page, CODE, TSX)
    const at = besideAt(page, DRAWN, JS)
    if (code === null || at === null) continue
    const text = textOf(change.after(code))
    if (text === null) continue
    written.push({ kind: "add", path: at, content: turnedInto(text) })
  }
  return written
}
