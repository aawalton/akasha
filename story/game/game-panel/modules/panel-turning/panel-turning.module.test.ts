import { expect, test } from "bun:test"
import { turnedInto } from "akasha/story/game/game-panel/modules/panel-turning/panel-turning.module.code.ts"

test("an import of values becomes a reading of what the app offers", () => {
  const turned = turnedInto(
    'import { poolPanelBy } from "akasha/a/b.module.code.tsx"\n\nconst a = 1\n'
  )
  expect(turned).toBe(
    'const { poolPanelBy } = globalThis.akashaDrawing["akasha/a/b.module.code.tsx"]\n\nconst a = 1\n'
  )
})

test("an import of types is taken away", () => {
  expect(turnedInto('import type { Held } from "akasha/a/b.module.code.ts"\nconst a = 1\n')).toBe(
    "const a = 1\n"
  )
})

test("a type named among values is left out of the reading", () => {
  const turned = turnedInto('import { type Held, panelBy } from "akasha/a/b.module.code.ts"\n')
  expect(turned).toBe('const { panelBy } = globalThis.akashaDrawing["akasha/a/b.module.code.ts"]\n')
})

test("an import naming only types is taken away", () => {
  expect(turnedInto('import { type Held } from "akasha/a/b.module.code.ts"\nconst a = 1\n')).toBe(
    "const a = 1\n"
  )
})

test("the line marking code as the client's is taken away", () => {
  expect(turnedInto('"use client"\n\nconst a = 1\n')).toBe("const a = 1\n")
})

test("an import written over several lines is read whole", () => {
  const turned = turnedInto('import {\n  one,\n  two,\n} from "akasha/a/b.module.code.ts"\n')
  expect(turned).toBe(
    'const { one, two } = globalThis.akashaDrawing["akasha/a/b.module.code.ts"]\n'
  )
})
