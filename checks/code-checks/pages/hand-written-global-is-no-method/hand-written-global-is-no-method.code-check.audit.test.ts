import { afterAll, expect, test } from "bun:test"
import { noPathsFiled, valueAlsoFiled } from "@akasha/indexes/testing"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { filing } from "../../../modules/scratch/check-scratch.module.code.ts"
import { handWrittenGlobalIsNoMethod } from "./hand-written-global-is-no-method.code-check.audit.code.ts"
import { DECLARATION } from "./hand-written-global-is-no-method.code-check.decision.code.ts"

const GAME_AT = "akasha/game.type-declaration.ts"

const GAME_D = "akasha/game.type-declaration.d.ts"

const OWN_AT = "akasha/own.type-declaration.ts"

const OWN_D = "akasha/own.type-declaration.d.ts"

const GAME_ID = "01a0823c-3bff-7d55-8000-000000000003"

const OWN_ID = "01a0823c-3bff-7d55-8000-000000000004"

const GAME = `interface Manager {
  Reload(): void
}
`

const scratch = scratchWorld()

afterAll(scratch.sweep)

function treed(own: string): string {
  const root = scratch.rootFor("akasha-hand-written-global-audit-")
  noPathsFiled(root)
  filing(root, DECLARATION, "game", GAME_ID)
  filing(root, DECLARATION, "own", OWN_ID)
  valueAlsoFiled(root, DECLARATION, [
    {
      path: GAME_AT,
      value: {
        id: GAME_ID,
        pageTypeSlug: DECLARATION,
        slug: "game",
        generated: { writtenBy: "held" },
      },
    },
    { path: OWN_AT, value: { id: OWN_ID, pageTypeSlug: DECLARATION, slug: "own" } },
  ])
  writing(root, GAME_D, GAME)
  writing(root, OWN_D, own)
  return root
}

test("an audit reads each declaration file from the disk and refuses a global naming a method", () => {
  const root = treed("declare function Reload(this: void): void\n")
  const said = handWrittenGlobalIsNoMethod(root)
  expect(said.map((one) => one.path)).toEqual([OWN_D])
  expect(said[0]?.reason).toContain("Reload")
})

test("an audit lets through a hand-written global the generated declarations name nowhere", () => {
  expect(handWrittenGlobalIsNoMethod(treed("declare function Apart(this: void): void\n"))).toEqual(
    []
  )
})
