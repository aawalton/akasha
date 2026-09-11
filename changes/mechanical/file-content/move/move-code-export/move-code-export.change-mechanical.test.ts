import { expect, test } from "bun:test"
import { runChange } from "akasha/changes/mechanical/file-content/move/move-code-export/move-code-export.change-mechanical.code.ts"
import {
  addedAt,
  ELSEWHERE,
  FAR,
  FROM,
  NAMED,
  NAMED_AT,
  puttingAt,
  ROOT,
  ROOT_AT,
  TO,
  takenAt,
  USES,
  worldOf,
} from "akasha/changes/mechanical/file-content/move/move-code-export/move-code-export.change-mechanical.test-fixtures.ts"

const DEEP = `import type { Deep } from "./deep.held.ts"`

const HELD = `${DEEP}

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly name: string
}
`

const SHARED = `${DEEP}

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly deep: Deep
}
`

const USING = `import type { Kept } from "./one.held.ts"

export type Wraps = {
  readonly kept: Kept
}
`

const FAR_USING = `import type { Kept } from "../one.held.ts"

export type Holds = {
  readonly kept: Kept
}
`

const LANDED = `${DEEP}

export type Kept = {
  readonly deep: Deep
}
`

const TAKEN = `

export type Kept = {
  readonly deep: Deep
}`

test("the type lands in the sibling body with the import that type names", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(LANDED)
})

test("every body importing that type names the path the type landed at", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(puttingAt(said, USES)).toEqual([`import type { Kept } from "./two.held.ts"`])
})

test("an importer in another folder keeps the way that importer spells the folder", async () => {
  const world = worldOf({ [FROM]: HELD, [FAR]: FAR_USING }, [FAR])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(puttingAt(said, FAR)).toEqual([`import type { Kept } from "../two.held.ts"`])
})

test("the declaration leaves the body that declared it", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Kept" })

  expect(takenAt(said, FROM)).toContain(TAKEN)
})

test("an import the body left behind no longer names is dropped", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Kept" })

  expect(takenAt(said, FROM)).toContain(`${DEEP}\n`)
})

test("an import the body left behind still names is kept", async () => {
  const said = await runChange(worldOf({ [FROM]: SHARED }), { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(takenAt(said, FROM)).not.toContain(`${DEEP}\n`)
})

const LANDED_FAR = `import type { Deep } from "../one/deep.held.ts"

export type Kept = {
  readonly deep: Deep
}
`

test("a landing path in another folder is taken and every importer repointed", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: ELSEWHERE, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, USES)).toEqual([`import type { Kept } from "../two/two.held.ts"`])
})

test("an import carried to another folder is spelled from the folder it landed in", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: ELSEWHERE, of: "Kept" })

  expect(addedAt(said, ELSEWHERE)).toBe(LANDED_FAR)
})

const STILL = `${DEEP}

export type Kept = {
  readonly deep: Deep
}

export type Other = {
  readonly kept: Kept
}
`

test("the body left behind names the type where it landed in another folder", async () => {
  const world = worldOf({ [FROM]: STILL })

  const said = await runChange(world, { from: FROM, to: ELSEWHERE, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, FROM).join("")).toContain(`import type { Kept } from "../two/two.held.ts"`)
})

test("the import back is spelled from the root where the root names a way in", async () => {
  const world = worldOf({ [FROM]: STILL, [NAMED_AT]: NAMED, [ROOT_AT]: ROOT })

  const said = await runChange(world, { from: FROM, to: ELSEWHERE, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, FROM).join("")).toContain(`import type { Kept } from "tree/${ELSEWHERE}"`)
})

const ALREADY = `import { join } from "node:path"

export const OTHER = join("x", "y")
`

const BARE = `export const OTHER = 1
`

const CLASHES = `import { join } from "./other.held.ts"

export const OTHER = join("x", "y")
`

const IMPORTS_IT = `import { AT } from "./one.held.ts"

export const OTHER = AT
`

test("a landing body already naming that import takes the declaration at its end", async () => {
  const world = worldOf({ [FROM]: VALUED, [TO]: ALREADY })

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, TO)).toEqual([`${ALREADY}\nexport const AT = join("a", "b")\n`])
})

test("a landing body naming no such import takes the import with the declaration", async () => {
  const world = worldOf({ [FROM]: VALUED, [TO]: BARE })

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, TO)).toEqual([
    `import { join } from "node:path"\n\n${BARE}\nexport const AT = join("a", "b")\n`,
  ])
})

const OWN_USING = `import type { Reached } from "../two/two.held.ts"

export function reaches(): Reached {
  return { absent: true }
}
`

test("an import naming the landing body itself is left out of what lands", async () => {
  const world = worldOf({ [FROM]: OWN_USING })

  const said = await runChange(world, { from: FROM, to: ELSEWHERE, of: "reaches" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, ELSEWHERE)).not.toContain("import")
})

test("a landing body that imported what moved no longer imports it", async () => {
  const world = worldOf({ [FROM]: VALUED, [TO]: IMPORTS_IT }, [TO])

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.refused).toBeNull()
  const put = puttingAt(said, TO).join("")
  expect(put).not.toContain(`from "./one.held.ts"`)
  expect(put).toContain(`export const AT = join("a", "b")`)
})

test("a landing body naming that import from another path is refused", async () => {
  const world = worldOf({ [FROM]: VALUED, [TO]: CLASHES })

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${TO}\` already names \`join\` from \`./other.held.ts\``)
})

test("a landing path already declaring that type is left as it is", async () => {
  const world = worldOf({ [FROM]: HELD, [TO]: LANDED, [USES]: USING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe("")
  expect(puttingAt(said, TO)).toEqual([])
  expect(puttingAt(said, USES)).toEqual([`import type { Kept } from "./two.held.ts"`])
})

test("a body declaring nothing of that name is refused", async () => {
  const said = await runChange(worldOf({ [FROM]: HELD }), { from: FROM, to: TO, of: "Missing" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(`\`${FROM}\` declares nothing named \`Missing\``)
})

const VALUED = `import { join } from "node:path"

export const AT = join("a", "b")

export type Other = {
  readonly name: string
}
`

const VALUE_USING = `import { AT } from "./one.held.ts"

export const held = AT
`

const VALUE_LANDED = `import { join } from "node:path"

export const AT = join("a", "b")
`

test("an exported value moves with the import its body names", async () => {
  const world = worldOf({ [FROM]: VALUED, [USES]: VALUE_USING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(VALUE_LANDED)
  expect(puttingAt(said, USES)).toEqual([`import { AT } from "./two.held.ts"`])
})

test("an import the body left behind no longer names goes with an exported value", async () => {
  const said = await runChange(worldOf({ [FROM]: VALUED }), { from: FROM, to: TO, of: "AT" })

  expect(takenAt(said, FROM)).toContain(`import { join } from "node:path"\n`)
})

const FUNCTIONED = `import { join } from "node:path"

export function at(one: string): string {
  return join(one, "b")
}
`

const FUNCTION_LANDED = `import { join } from "node:path"

export function at(one: string): string {
  return join(one, "b")
}
`

test("an exported function moves whole", async () => {
  const said = await runChange(worldOf({ [FROM]: FUNCTIONED }), { from: FROM, to: TO, of: "at" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(FUNCTION_LANDED)
})

const NAMED_USING = `import type { Kept } from "@held/one/one"

export type Wraps = {
  readonly kept: Kept
}
`

test("a body naming that type through a package names it from the workspace root", async () => {
  const world = worldOf({ [FROM]: HELD, [NAMED_AT]: NAMED, [ROOT_AT]: ROOT, [FAR]: NAMED_USING }, [
    FAR,
  ])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, FAR)).toEqual([`import type { Kept } from "tree/${TO}"`])
})

const ROOTED_USING = `import type { Kept } from "tree/${FROM}"

export type Wraps = {
  readonly kept: Kept
}
`

test("a body naming that type by the workspace root's own path names where it landed", async () => {
  const world = worldOf({ [FROM]: HELD, [NAMED_AT]: NAMED, [ROOT_AT]: ROOT, [FAR]: ROOTED_USING }, [
    FAR,
  ])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, FAR)).toEqual([`import type { Kept } from "tree/${TO}"`])
})

const ALIASING = `import type { Kept as Held } from "./one.held.ts"

export type Wraps = {
  readonly kept: Held
}
`

test("a body naming that type under another name goes on naming it under that name", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: ALIASING }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, USES)).toEqual([`import type { Kept as Held } from "./two.held.ts"`])
})

const ALIASING_TWO = `import type { Kept as Held, Other } from "./one.held.ts"

export type Wraps = {
  readonly kept: Held
  readonly other: Other
}
`

test("that other name is kept where the import naming it names something else too", async () => {
  const world = worldOf({ [FROM]: HELD, [USES]: ALIASING_TWO }, [USES])

  const said = await runChange(world, { from: FROM, to: TO, of: "Kept" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, USES)).toEqual([
    `import type { Other } from "./one.held.ts"\n` +
      `import type { Kept as Held } from "./two.held.ts"`,
  ])
})

const CARRIED_ALIAS = `import { said as gitIn } from "./git.held.ts"

export const AT = gitIn("a")
`

test("a carried import names what its path exports under the name the body gave it", async () => {
  const world = worldOf({ [FROM]: CARRIED_ALIAS })

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(CARRIED_ALIAS)
})

test("a landing body takes that carried import under that name too", async () => {
  const world = worldOf({ [FROM]: CARRIED_ALIAS, [TO]: BARE })

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, TO).join("")).toContain(`import { said as gitIn } from "./git.held.ts"`)
})

const PRIVATE = `function bodiedOf(one: string): string {
  return one
}

export function changeOf(one: string): string {
  return bodiedOf(one)
}
`

test("an export naming something its own body declares under no export is refused", async () => {
  const world = worldOf({ [FROM]: PRIVATE })

  const said = await runChange(world, { from: FROM, to: TO, of: "changeOf" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`changeOf\` names \`bodiedOf\`, which \`${FROM}\` declares under no export`
  )
})

const SIBLING = `export function childOf(one: number): number {
  return one
}

export function searchOf(one: number): number {
  return childOf(one)
}
`

const SIBLING_LANDED = `import { childOf } from "./one.held.ts"

export function searchOf(one: number): number {
  return childOf(one)
}
`

test("an export the moved body names from its own source file is imported from there", async () => {
  const world = worldOf({ [FROM]: SIBLING })

  const said = await runChange(world, { from: FROM, to: TO, of: "searchOf" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(SIBLING_LANDED)
})

test("that import is spelled from the checkout root where the root names a way in", async () => {
  const world = worldOf({ [FROM]: SIBLING, [NAMED_AT]: NAMED, [ROOT_AT]: ROOT })

  const said = await runChange(world, { from: FROM, to: TO, of: "searchOf" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toContain(`import { childOf } from "tree/${FROM}"`)
})

const SIBLING_BACK = `export function childOf(one: number): number {
  return one
}

export function searchOf(one: number): number {
  return childOf(one)
}

export const FIRST = searchOf(1)
`

test("carrying such an import where the two bodies would name each other is refused", async () => {
  const world = worldOf({ [FROM]: SIBLING_BACK })

  const said = await runChange(world, { from: FROM, to: TO, of: "searchOf" })

  expect(said.edits).toEqual([])
  expect(said.refused).toBe(
    `\`searchOf\` names \`childOf\` from \`${FROM}\`, which would name \`${TO}\` back`
  )
})

const STARRED_LINE = `import * as Utilities from "./utils.held.ts"`

const STARRED = `${STARRED_LINE}

export const AT = Utilities.questOf()
`

test("a namespace import the moved body names goes with that declaration", async () => {
  const world = worldOf({ [FROM]: STARRED })

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.refused).toBeNull()
  expect(addedAt(said, TO)).toBe(STARRED)
})

test("a landing body takes that namespace import too", async () => {
  const world = worldOf({ [FROM]: STARRED, [TO]: BARE })

  const said = await runChange(world, { from: FROM, to: TO, of: "AT" })

  expect(said.refused).toBeNull()
  expect(puttingAt(said, TO).join("")).toContain(STARRED_LINE)
})

test("a namespace import the body left behind no longer names is dropped", async () => {
  const said = await runChange(worldOf({ [FROM]: STARRED }), { from: FROM, to: TO, of: "AT" })

  expect(takenAt(said, FROM)).toContain(`${STARRED_LINE}\n`)
})
