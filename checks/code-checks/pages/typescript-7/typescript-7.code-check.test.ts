import { afterAll, describe, expect, test } from "bun:test"
import type { Change } from "@akasha/pages-system/change"
import { shadowFor } from "@akasha/pages-system/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change, generating, scratch } from "../typecheck/typecheck.code-check.test-fixtures.ts"
import { configOf, servingOf, typescript7, typesIn } from "./typescript-7.code-check.code.ts"

const ROOT = "/var/home/walton/repos/akasha"

const THING_AT = "akasha/one.thing.ts"

const READS_ITS_TYPE = 'import type { Thing } from "./thing.page-type.ts"\n\n'

const WITHOUT = `${READS_ITS_TYPE}export const one = { slug: "one" } as const satisfies Thing\n`

const WRONG = `${READS_ITS_TYPE}export const one = { slug: 1 } as const satisfies Thing\n`

const MADE_AT = "akasha/made/reader.ts"

const BESIDE_AT = "akasha/made/held.ts"

const READS_BESIDE = 'import { held } from "./held.ts"\n\nexport const reader = held\n'

const BESIDE = "export const held = 1\n"

afterAll(scratch.sweep)

async function judged(one: Change): Promise<readonly Judged[]> {
  const cast = shadowFor(one)
  if ("refused" in cast) throw new Error(cast.refused)
  return await typescript7(one, cast.shadow)
}

describe("the settings the program is built from", () => {
  test("name every ambient type the packages folder holds", () => {
    const held = typesIn(ROOT)
    expect(held.length).toBeGreaterThan(0)
    expect(held).toContain("bun")
  })

  test("carry the files judged", () => {
    const said: { compilerOptions: { types: string[] }; files: string[] } = JSON.parse(
      configOf(ROOT, ["one.ts", "two.ts"])
    )
    expect(said.files).toEqual(["one.ts", "two.ts"])
    expect(said.compilerOptions.types).toContain("bun")
  })
})

describe("what the compiler is served", () => {
  const at = `${ROOT}/tsconfig.typescript-7.json`
  const serving = servingOf(ROOT, at, "{}", (path) =>
    path.endsWith("held.ts") ? "export const held = 1" : undefined
  )

  test("answers the config at the path it was named by", () => {
    expect(serving(at)).toBe("{}")
  })

  test("answers a body the change carries", () => {
    expect(serving(`${ROOT}/held.ts`)).toBe("export const held = 1")
  })

  test("answers a path the change takes away as absent rather than as unknown", () => {
    expect(serving(`${ROOT}/gone.ts`)).toBeNull()
  })

  test("leaves a path outside the checkout to the disk", () => {
    expect(serving("/etc/hostname")).toBeUndefined()
  })
})

describe("what this compiler finds in a change", () => {
  test("a body the change breaks is refused at the path the break is at", async () => {
    const said = await judged(change(generating({}), { [THING_AT]: WRONG }))
    expect(said.length).toBeGreaterThan(0)
    expect(said[0]?.path).toBe(THING_AT)
    expect(said[0]?.reason).toContain("TS")
  })

  test("a body the change leaves whole is refused for nothing", async () => {
    expect(await judged(change(generating({}), { [THING_AT]: WITHOUT }))).toEqual([])
  })

  test("a body reaching one beside it in a folder the change makes is refused for nothing", async () => {
    const said = await judged(
      change(generating({}), { [MADE_AT]: READS_BESIDE, [BESIDE_AT]: BESIDE })
    )
    expect(said).toEqual([])
  })
})
