import { expect, test } from "bun:test"
import {
  landKeybindingsCommand,
  runChange,
} from "akasha/change/agent/page/land-keybindings/land-keybindings.change-agent.code.ts"
import { worldUnder } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import {
  keybindingPagePath,
  keybindingPageText,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-pages/keybinding-pages.module.code.ts"

const PORT = "PORTTOFRIENDSHOUSE_FAV_MYHOUSE_INSIDE_1"

const NONE = { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const HOME = { keyCode: 17, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }

const SEEDED_AT = "2026-10-28T21:29:00.000Z"

const CAPTURE = { version: 1, Keybindings: { [PORT]: { 4: NONE, 1: HOME, 2: NONE, 3: NONE } } }

const PAGE_AT = keybindingPagePath(PORT)

const PAGE = keybindingPageText(
  { key: PORT, bindings: [{ slot: 1, key: "KEY_HOME" }], shared: true, changedAt: SEEDED_AT },
  { id: "01a18478-0000-7000-8000-000000000001", createdAt: SEEDED_AT }
)

test("a shared binding no page holds is added as a page of its own", () => {
  const said = landKeybindingsCommand(worldUnder({}), CAPTURE, SEEDED_AT)
  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    {
      kind: "add",
      path: PAGE_AT,
      content: keybindingPageText({
        key: PORT,
        bindings: [{ slot: 1, key: "KEY_HOME" }],
        shared: true,
        changedAt: SEEDED_AT,
      }),
    },
  ])
})

test("a run over the pages a run wrote writes nothing", () => {
  expect(landKeybindingsCommand(worldUnder({ [PAGE_AT]: PAGE }), CAPTURE, SEEDED_AT).edits).toEqual(
    []
  )
})

test("a key rebound in the game after its page changed writes the page again, keeping its id", () => {
  const rebound = {
    ...CAPTURE,
    Changes: {
      [PORT]: {
        at: 1793223000,
        shared: true,
        bindings: [{ ...HOME, keyCode: 16 }, NONE, NONE, NONE],
      },
    },
  }
  const said = landKeybindingsCommand(worldUnder({ [PAGE_AT]: PAGE }), rebound, SEEDED_AT)
  const one = said.edits[0]
  expect(one?.kind).toBe("replace")
  if (one?.kind !== "replace") return
  expect(one.contentTo).toContain('key: "KEY_END"')
  expect(one.contentTo).toContain('id: "01a18478-0000-7000-8000-000000000001"')
  expect(one.contentTo).toContain('changedAt: "2026-10-28T21:30:00.000Z"')
})

test("a capture that is no JSON is refused", async () => {
  const said = await runChange(worldUnder({}), { capture: "{", "seeded-at": SEEDED_AT })
  expect(said.refused).toMatch(/no JSON/)
})

test("a seeded instant that is not UTC to the millisecond is refused", async () => {
  const said = await runChange(worldUnder({}), { capture: "{}", "seeded-at": "yesterday" })
  expect(said.refused).toMatch(/no instant/)
})
