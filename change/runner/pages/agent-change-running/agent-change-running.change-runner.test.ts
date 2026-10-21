import { afterAll, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { stating } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { editsIn } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import { runAgentChange } from "akasha/change/runner/pages/agent-change-running/agent-change-running.change-runner.code.ts"
import { appending } from "akasha/command/modules/change-running/change-running.module.code.ts"
import {
  applying,
  CHOSEN,
  PAGE,
  repo,
} from "akasha/command/modules/change-running/change-running.module.test-fixtures.ts"
import { piping } from "akasha/command/modules/piping/piping.module.test-fixtures.ts"
import {
  HELD_CODE,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"

afterAll(scratch.sweep)

const PIN_SLUG = "remove-page"

const PIN_CODE = `akasha/changes/${PIN_SLUG}.change-agent.code.ts`

const PINNED = "akasha/one/pinned.txt"

const PIN = `import { kept } from "../one/held.module.code.ts"

export const runChange = () => ({
  edits: [{ kind: "add", path: "${PINNED}", content: String(kept) + "\\n" }],
  refused: null,
})
`

const WAS = "export const kept = 1\n"

const NOW = "export const kept = 2\n"

function pinnedIn(root: string): string | null {
  const said = editsIn(root, PAGE)
  if ("why" in said) return null
  const one = said.rows.find((row) => row.kind === "add" && row.path === PINNED)
  return one?.kind === "add" ? one.content : null
}

async function pinning(root: string): Promise<string | null> {
  writeFileSync(join(root, PIN_CODE), PIN)
  const said = await runAgentChange(
    root,
    PAGE,
    null,
    PIN_SLUG,
    piping("draft: true\n"),
    applying,
    CHOSEN
  )
  expect(said.code).toBe(0)
  return pinnedIn(root)
}

test("a change run over no kept edit computes with the code on the disk", async () => {
  expect(await pinning(repo())).toBe("1\n")
})

test("a change run over a kept calculation change computes with that change", async () => {
  const root = repo()
  await appending(root, PAGE, null, false, async () =>
    stating([{ kind: "replace", path: HELD_CODE, contentFrom: WAS, contentTo: NOW }])
  )

  expect(await pinning(root)).toBe("2\n")
})
