import { expect, test } from "bun:test"
import {
  ALIASING,
  ALIASING_TWO,
  ALREADY,
  ALSO_LANDING,
  ALSO_LANDING_EVERY,
  ALSO_LANDING_PART,
  BACK_ALREADY,
  BARE,
  BOTH,
  BOTH_BACK,
  bodyIn,
  CARRIED_ALIAS,
  CLASHES,
  DECLARES_GIVEN,
  DEEP,
  ELSEWHERE,
  FAR,
  FAR_USING,
  FROM,
  FUNCTIONED,
  HELD,
  IMPORTS_IT,
  LANDED,
  LANDED_FAR,
  NAMED,
  NAMED_AT,
  NAMED_USING,
  NAMES_IT,
  NAMES_LANDING,
  NAMING,
  NEITHER_LEFT,
  OTHER_PATH,
  OWN_USING,
  PRIVATE,
  planOf,
  ROOT,
  ROOT_AT,
  ROOTED_USING,
  refusalIn,
  SHADOWING,
  SHARED,
  SIBLING,
  SIBLING_BACK,
  SIBLING_LANDED,
  SIBLING_TYPED_BACK,
  SIBLING_TYPED_LANDED,
  STARRED,
  STARRED_LINE,
  STILL,
  TAKEN,
  TO,
  TWO_CARRIED,
  tookAt,
  USES,
  USING,
  USING_BOTH,
  USING_THREE,
  VALUE_LANDED,
  VALUE_USING,
  VALUED,
  wroteAt,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.test-fixtures.ts"

const KEPT = { from: FROM, to: TO, of: ["Kept"] }

const AT = { from: FROM, to: TO, of: ["AT"] }

const KEPT_FAR = { from: FROM, to: ELSEWHERE, of: ["Kept"] }

const TWO = { from: FROM, to: TO, of: ["Kept", "Other"] }

const SEARCH = { from: FROM, to: TO, of: ["searchOf"] }

const REASONS = { from: FROM, to: TO, of: ["reasonsOver"] }

const NODE_PATH = `from "node:path"`

const ROOTED = { [NAMED_AT]: NAMED, [ROOT_AT]: ROOT }

test("the type lands in the sibling body with the import that type names", () => {
  const made = planOf({ [FROM]: HELD, [USES]: USING }, KEPT, [USES])

  expect(bodyIn(made)).toBe(LANDED)
})

test("every body importing that type names the path the type landed at", () => {
  const made = planOf({ [FROM]: HELD, [USES]: USING }, KEPT, [USES])

  expect(wroteAt(made, USES)).toEqual([`import type { Kept } from "./two.held.ts"`])
})

test("an importer in another folder keeps the way that importer spells the folder", () => {
  const made = planOf({ [FROM]: HELD, [FAR]: FAR_USING }, KEPT, [FAR])

  expect(wroteAt(made, FAR)).toEqual([`import type { Kept } from "../two.held.ts"`])
})

test("the declaration leaves the body that declared it", () => {
  expect(tookAt(planOf({ [FROM]: HELD }, KEPT), FROM)).toContain(TAKEN)
})

test("an import the body left behind no longer names is dropped", () => {
  expect(tookAt(planOf({ [FROM]: HELD }, KEPT), FROM)).toContain(`${DEEP}\n`)
})

test("an import the body left behind still names is kept", () => {
  const made = planOf({ [FROM]: SHARED }, KEPT)

  expect(refusalIn(made)).toBe("")
  expect(tookAt(made, FROM)).not.toContain(`${DEEP}\n`)
})

test("a landing path in another folder is taken and every importer repointed", () => {
  const made = planOf({ [FROM]: HELD, [USES]: USING }, KEPT_FAR, [USES])

  expect(wroteAt(made, USES)).toEqual([`import type { Kept } from "../two/two.held.ts"`])
})

test("an import carried to another folder is spelled from the folder it landed in", () => {
  const made = planOf({ [FROM]: HELD, [USES]: USING }, KEPT_FAR, [USES])

  expect(bodyIn(made)).toBe(LANDED_FAR)
})

test("the body left behind names the type where it landed in another folder", () => {
  const made = planOf({ [FROM]: STILL }, KEPT_FAR)

  expect(wroteAt(made, FROM).join("")).toContain(`import type { Kept } from "../two/two.held.ts"`)
})

test("the import back is spelled from the root where the root names a way in", () => {
  const made = planOf({ [FROM]: STILL, ...ROOTED }, KEPT_FAR)

  expect(wroteAt(made, FROM).join("")).toContain(`import type { Kept } from "tree/${ELSEWHERE}"`)
})

test("the import back joins the line that body already takes from there", () => {
  const made = planOf({ [FROM]: BACK_ALREADY }, { from: FROM, to: TO, of: ["keptOf"] })

  const put = wroteAt(made, FROM).join("")
  expect(put).toContain(`import { type Deep, keptOf } from "./two.held.ts"`)
  expect(put.split(`from "./two.held.ts"`).length - 1).toBe(1)
})

test("a landing body already naming that import takes the declaration at its end", () => {
  const made = planOf({ [FROM]: VALUED, [TO]: ALREADY }, AT)

  expect(wroteAt(made, TO)).toEqual([`${ALREADY}\nexport const AT = join("a", "b")\n`])
})

test("the declarations land above the first statement the landing body names them in", () => {
  const made = planOf({ [FROM]: VALUED, [TO]: NAMES_IT }, AT)

  expect(wroteAt(made, TO)).toEqual([
    `import { join } from "node:path"\n` +
      `\nexport const AT = join("a", "b")\n` +
      `\nexport const OTHER = AT\n` +
      `\nexport const LAST = 1\n`,
  ])
})

test("a landing body naming no such import takes the import with the declaration", () => {
  const made = planOf({ [FROM]: VALUED, [TO]: BARE }, AT)

  expect(wroteAt(made, TO)).toEqual([
    `import { join } from "node:path"\n\n${BARE}\nexport const AT = join("a", "b")\n`,
  ])
})

test("an import naming the landing body itself is left out of what lands", () => {
  const made = planOf({ [FROM]: OWN_USING }, { from: FROM, to: ELSEWHERE, of: ["reaches"] })

  expect(bodyIn(made)).not.toContain("import")
})

test("an import naming the landing body by the root is left out of what lands", () => {
  const made = planOf({ [FROM]: NAMES_LANDING, ...ROOTED }, SEARCH)

  expect(bodyIn(made)).not.toContain("import")
})

test("a landing body that imported what moved no longer imports it", () => {
  const put = wroteAt(planOf({ [FROM]: VALUED, [TO]: IMPORTS_IT }, AT, [TO]), TO).join("")

  expect(put).not.toContain(`from "./one.held.ts"`)
  expect(put).toContain(`export const AT = join("a", "b")`)
})

test("a carried import joins the line the landing body already takes from that path", () => {
  const put = wroteAt(planOf({ [FROM]: VALUED, [TO]: OTHER_PATH }, AT), TO).join("")

  expect(put).toContain(`import { dirname, join } from "node:path"`)
  expect(put.split(NODE_PATH).length - 1).toBe(1)
})

test("carried names sharing one path are written as one line", () => {
  const made = planOf({ [FROM]: TWO_CARRIED }, AT)
  const onto = planOf({ [FROM]: TWO_CARRIED, [TO]: BARE }, AT)

  expect(bodyIn(made).split(NODE_PATH).length - 1).toBe(1)
  expect(wroteAt(onto, TO).join("").split(NODE_PATH).length - 1).toBe(1)
})

test("a landing body naming that import from another path is refused", () => {
  const made = planOf({ [FROM]: VALUED, [TO]: CLASHES }, AT)

  expect(refusalIn(made)).toBe(`\`${TO}\` already names \`join\` from \`./other.held.ts\``)
})

test("a declaration that binds a name the landing body declares is refused", () => {
  const made = planOf({ [FROM]: SHADOWING, [TO]: DECLARES_GIVEN }, REASONS)

  expect(refusalIn(made)).toBe(`\`reasonsOver\` binds \`given\`, which \`${TO}\` already declares`)
})

test("a landing path already declaring that type is left as it is", () => {
  const made = planOf({ [FROM]: HELD, [TO]: LANDED, [USES]: USING }, KEPT, [USES])

  expect(bodyIn(made)).toBe("")
  expect(wroteAt(made, TO)).toEqual([])
  expect(wroteAt(made, USES)).toEqual([`import type { Kept } from "./two.held.ts"`])
})

test("a body declaring nothing of that name is refused", () => {
  const made = planOf({ [FROM]: HELD }, { from: FROM, to: TO, of: ["Missing"] })

  expect(refusalIn(made)).toBe(`\`${FROM}\` declares nothing named \`Missing\``)
})

test("an exported value moves with the import its body names", () => {
  const made = planOf({ [FROM]: VALUED, [USES]: VALUE_USING }, AT, [USES])

  expect(bodyIn(made)).toBe(VALUE_LANDED)
  expect(wroteAt(made, USES)).toEqual([`import { AT } from "./two.held.ts"`])
})

test("an import the body left behind no longer names goes with an exported value", () => {
  expect(tookAt(planOf({ [FROM]: VALUED }, AT), FROM)).toContain(
    `import { join } from "node:path"\n`
  )
})

test("two names the body left behind no longer takes from one line go out together", () => {
  expect(tookAt(planOf({ [FROM]: NEITHER_LEFT }, AT), FROM)).toContain(
    `import { dirname, join } from "node:path"\n`
  )
})

test("an exported function moves whole", () => {
  const made = planOf({ [FROM]: FUNCTIONED }, { from: FROM, to: TO, of: ["at"] })

  expect(bodyIn(made)).toBe(FUNCTIONED)
})

test("a body naming that type through a package names it from the workspace root", () => {
  const made = planOf({ [FROM]: HELD, ...ROOTED, [FAR]: NAMED_USING }, KEPT, [FAR])

  expect(wroteAt(made, FAR)).toEqual([`import type { Kept } from "tree/${TO}"`])
})

test("a body naming that type by the workspace root's own path names where it landed", () => {
  const made = planOf({ [FROM]: HELD, ...ROOTED, [FAR]: ROOTED_USING }, KEPT, [FAR])

  expect(wroteAt(made, FAR)).toEqual([`import type { Kept } from "tree/${TO}"`])
})

test("a body naming that type under another name goes on naming it under that name", () => {
  const made = planOf({ [FROM]: HELD, [USES]: ALIASING }, KEPT, [USES])

  expect(wroteAt(made, USES)).toEqual([`import type { Kept as Held } from "./two.held.ts"`])
})

test("that other name is kept where the import naming it names something else too", () => {
  const made = planOf({ [FROM]: HELD, [USES]: ALIASING_TWO }, KEPT, [USES])

  expect(wroteAt(made, USES)).toEqual([
    `import type { Other } from "./one.held.ts"\n` +
      `import type { Kept as Held } from "./two.held.ts"`,
  ])
})

test("a carried import names what its path exports under the name the body gave it", () => {
  expect(bodyIn(planOf({ [FROM]: CARRIED_ALIAS }, AT))).toBe(CARRIED_ALIAS)
})

test("a landing body takes that carried import under that name too", () => {
  const put = wroteAt(planOf({ [FROM]: CARRIED_ALIAS, [TO]: BARE }, AT), TO).join("")

  expect(put).toContain(`import { said as gitIn } from "./git.held.ts"`)
})

test("an export naming something its own body declares under no export is refused", () => {
  const made = planOf({ [FROM]: PRIVATE }, { from: FROM, to: TO, of: ["changeOf"] })

  expect(refusalIn(made)).toBe(
    `\`changeOf\` names \`bodiedOf\`, which \`${FROM}\` declares under no export`
  )
})

test("an export the moved body names from its own source file is imported from there", () => {
  expect(bodyIn(planOf({ [FROM]: SIBLING }, SEARCH))).toBe(SIBLING_LANDED)
})

test("that import is spelled from the checkout root where the root names a way in", () => {
  const made = planOf({ [FROM]: SIBLING, ...ROOTED }, SEARCH)

  expect(bodyIn(made)).toContain(`import { childOf } from "tree/${FROM}"`)
})

test("carrying such an import of a value where the two bodies would name each other is refused", () => {
  const made = planOf({ [FROM]: SIBLING_BACK }, SEARCH)

  expect(refusalIn(made)).toBe(
    `\`searchOf\` names \`childOf\` from \`${FROM}\`, which would name \`${TO}\` back`
  )
})

test("an import the compiler erases is carried back where the two bodies name each other", () => {
  expect(bodyIn(planOf({ [FROM]: SIBLING_TYPED_BACK }, SEARCH))).toBe(SIBLING_TYPED_LANDED)
})

test("a namespace import the moved body names goes with that declaration", () => {
  expect(bodyIn(planOf({ [FROM]: STARRED }, AT))).toBe(STARRED)
})

test("a landing body takes that namespace import too", () => {
  const put = wroteAt(planOf({ [FROM]: STARRED, [TO]: BARE }, AT), TO).join("")

  expect(put).toContain(STARRED_LINE)
})

test("a namespace import the body left behind no longer names is dropped", () => {
  expect(tookAt(planOf({ [FROM]: STARRED }, AT), FROM)).toContain(`${STARRED_LINE}\n`)
})

test("every declaration named is taken out of the source in one plan", () => {
  const made = planOf({ [FROM]: BOTH }, TWO)

  expect(tookAt(made, FROM)).toContain(TAKEN)
  expect(bodyIn(made)).toBe(SHARED)
})

test("an import two carried declarations both name is written once", () => {
  expect(bodyIn(planOf({ [FROM]: BOTH }, TWO)).split(`"./deep.held.ts"`).length - 1).toBe(1)
})

test("an import nothing left behind names goes only once every declaration has gone", () => {
  expect(tookAt(planOf({ [FROM]: BOTH }, TWO), FROM)).toContain(`${DEEP}\n`)
  expect(tookAt(planOf({ [FROM]: BOTH }, KEPT), FROM)).not.toContain(`${DEEP}\n`)
})

test("a declaration naming another declaration carried with it takes no import", () => {
  const made = planOf({ [FROM]: NAMING }, { from: FROM, to: TO, of: ["childOf", "searchOf"] })

  expect(bodyIn(made)).toBe(SIBLING)
})

test("the import back names every declaration the body left behind still takes", () => {
  const put = wroteAt(planOf({ [FROM]: BOTH_BACK }, TWO), FROM).join("")

  expect(put).toContain(`import type { Kept, Other } from "./two.held.ts"`)
  expect(put.split(`from "./two.held.ts"`).length - 1).toBe(1)
})

test("an importer naming two of the declarations carried is rewritten once", () => {
  const made = planOf({ [FROM]: BOTH, [USES]: USING_BOTH }, TWO, [USES])

  expect(wroteAt(made, USES)).toEqual([`import type { Kept, Other } from "./two.held.ts"`])
})

test("that one rewrite keeps the name the importer takes from the body left behind", () => {
  const made = planOf({ [FROM]: BOTH, [USES]: USING_THREE }, TWO, [USES])

  expect(wroteAt(made, USES)).toEqual([
    `import type { Stays } from "./one.held.ts"\n` +
      `import type { Kept, Other } from "./two.held.ts"`,
  ])
})

test("an importer already taking a line from the landing joins what moved to that line", () => {
  const made = planOf({ [FROM]: HELD, [TO]: BARE, [USES]: ALSO_LANDING }, KEPT, [USES])

  expect(wroteAt(made, USES).join("")).toBe(`import { OTHER, type Kept } from "./two.held.ts"`)
  expect(tookAt(made, USES)).toContain(`import type { Kept } from "./one.held.ts"\n`)
})

test("that joining keeps the name the importer still takes from the body left behind", () => {
  const made = planOf({ [FROM]: HELD, [TO]: BARE, [USES]: ALSO_LANDING_PART }, KEPT, [USES])

  expect(wroteAt(made, USES)).toEqual([
    `import type { Other } from "./one.held.ts"`,
    `import { OTHER, type Kept } from "./two.held.ts"`,
  ])
})

test("every export carried joins that one line rather than opening a line each", () => {
  const made = planOf({ [FROM]: HELD, [TO]: BARE, [USES]: ALSO_LANDING_PART }, TWO, [USES])

  expect(wroteAt(made, USES).join("")).toBe(
    `import { OTHER, type Kept, type Other } from "./two.held.ts"`
  )
})

test("an importer whose line from the landing names no member takes a line of its own", () => {
  const made = planOf({ [FROM]: HELD, [TO]: BARE, [USES]: ALSO_LANDING_EVERY }, KEPT, [USES])

  expect(wroteAt(made, USES)).toEqual([`import type { Kept } from "./two.held.ts"`])
})
