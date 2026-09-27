import { expect, test } from "bun:test"
import {
  type Promoted,
  type Promoting,
  promotedApp,
  scriptFor,
  TAIL,
} from "akasha/command/pages/deploy/modules/desktop-app-promoting/deploy-desktop-app-promoting.module.code.ts"

const REPOS = "/at/repos"

const CALLED = "akasha deploy"

const PROMOTE = "/at/repos/code-editor/tools/promote.sh"

type Script = { readonly runs: (readonly string[])[]; readonly run: Promoting }

function scriptEnding(ending: Promoted): Script {
  const runs: (readonly string[])[] = []
  const run: Promoting = async (argv) => {
    runs.push(argv)
    return await Promise.resolve(ending)
  }
  return { runs, run }
}

test("the script is the promote script in the checkout named for the slug", () => {
  expect(scriptFor("code-editor", REPOS)).toBe(PROMOTE)
})

test("the script is run by bash, named by its path alone", async () => {
  const script = scriptEnding({ code: 0, lines: [] })
  await promotedApp("code-editor", CALLED, [], script.run, REPOS)
  expect(script.runs).toEqual([["bash", PROMOTE]])
})

test("a script ending at zero is told with its last lines and names what went up", async () => {
  const up: string[] = []
  const script = scriptEnding({ code: 0, lines: ["built", "promoted"] })
  const said = await promotedApp("code-editor", CALLED, up, script.run, REPOS)
  expect(said.code).toBe(0)
  expect(said.report).toEqual(["built", "promoted"])
  expect(up).toEqual([`code-editor, promoted by ${PROMOTE}`])
})

test("only the last lines of a long run are answered", async () => {
  const many = Array.from({ length: TAIL + 5 }, (_, at) => `line ${String(at)}`)
  const script = scriptEnding({ code: 0, lines: many })
  const said = await promotedApp("code-editor", CALLED, [], script.run, REPOS)
  expect(said.report).toEqual(many.slice(-TAIL))
})

test("a script ending at anything but zero refuses with its last lines and puts nothing up", async () => {
  const up: string[] = []
  const script = scriptEnding({ code: 2, lines: ["REFUSED: gate"] })
  const said = await promotedApp("code-editor", CALLED, up, script.run, REPOS)
  expect(said.code).not.toBe(0)
  expect(said.report).toEqual(["REFUSED: gate"])
  expect(said.refusals[0]).toContain("ended at 2")
  expect(up).toEqual([])
})
