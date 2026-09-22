import { expect, test } from "bun:test"
import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"
import {
  statedSeat,
  tookSeat,
  unfiled,
} from "akasha/agent/seat/declaration/modules/seat-landing/seat-landing.module.code.ts"
import type { SeatStated } from "akasha/agent/seat/declaration/modules/seat-stating/seat-stating.module.code.ts"
import {
  seatPathForName,
  seatsAt,
} from "akasha/agent/seat/page/modules/seat-reading/seat-reading.module.code.ts"
import { EXIT } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFile } from "akasha/change/mechanical/file/remove/remove-file/remove-file.change-mechanical-file.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"

const ROOT = rootOf(import.meta.dir)

const WHOLE: SeatStated = {
  agentId: "01a05e00-0000-7000-8000-000000000001",
  persona: "athena",
  domain: "agent-harness",
  assignment: null,
  role: "definer",
  principal: "alan",
  mode: "interactive",
  registration: "aawalton",
  onCall: true,
  session: null,
  parentName: null,
}

const STOPPED = "athena"

const PAGE_AT = seatPathForName(STOPPED)

const PAGE_BODY = "export const athena = {} as const\n"

const TAKE_PAGE = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

const TAKE_FILE = `${changeMechanicalFile.slug}/${removeFile.slug}` as const

const UNFILED_SAID = `\`${PAGE_AT}\` names no page, so no page is taken away`

const HELD_LOCK = "another landing has held the lock"

const COMMITTED = "1111111111111111111111111111111111111111"

function landingSaying(answers: readonly (readonly string[])[]): {
  readonly landing: Landing
  readonly named: readonly string[]
} {
  const named: string[] = []
  let asked = 0
  const landing: Landing = (_root, changes, _message) => {
    named.push(changes.map((one) => one.at).join(","))
    const said = answers[asked] ?? []
    asked += 1
    return Promise.resolve({ refusals: [...said], code: EXIT.OPERATIONAL })
  }
  return { landing, named }
}

async function stopping(
  answers: readonly (readonly string[])[],
  name: string = STOPPED
): Promise<{ readonly said: unknown; readonly named: readonly string[] }> {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-landing-")
    writing(root, PAGE_AT, PAGE_BODY)
    const run = landingSaying(answers)
    const said = await tookSeat(root, name, "deliberate", run.landing)
    return { said, named: run.named }
  } finally {
    world.sweep()
  }
}

test("a seat that stopped has its page taken away with the files beside that page", async () => {
  const ran = await stopping([[]])
  expect(ran.said).toEqual({ kind: "took" })
  expect(ran.named).toEqual([TAKE_PAGE])
})

test("a path the index files no page at has its page alone taken away", async () => {
  const ran = await stopping([[UNFILED_SAID], []])
  expect(ran.said).toEqual({ kind: "took" })
  expect(ran.named).toEqual([TAKE_PAGE, TAKE_FILE])
})

test("a refusal that is not that one takes no page away and is answered as a refusal", async () => {
  const ran = await stopping([[HELD_LOCK], []])
  expect(ran.said).toEqual({ kind: "refused", said: HELD_LOCK })
  expect(ran.named).toEqual([TAKE_PAGE])
})

test("a page alone refused after that one refusal is answered as a refusal", async () => {
  const ran = await stopping([[UNFILED_SAID], [HELD_LOCK]])
  expect(ran.said).toEqual({ kind: "refused", said: HELD_LOCK })
  expect(ran.named).toEqual([TAKE_PAGE, TAKE_FILE])
})

test("a seat whose page is not there names no change", async () => {
  const ran = await stopping([[]], "nobody-sits-here")
  expect(ran.said).toEqual({ kind: "unchanged" })
  expect(ran.named).toEqual([])
})

test("a stop whose landing committed before it refused names that commit", async () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-landing-")
    writing(root, PAGE_AT, PAGE_BODY)
    const landing: Landing = (_root, _changes, _message, carried) => {
      carried?.done?.push(COMMITTED)
      return Promise.resolve({ refusals: [HELD_LOCK], code: EXIT.OPERATIONAL })
    }
    const said = await tookSeat(root, STOPPED, "deliberate", landing)
    expect(said.kind).toBe("refused")
    expect(said.kind === "refused" ? said.said : "").toContain(COMMITTED)
  } finally {
    world.sweep()
  }
})

test("the page alone is taken away after that one refusal and no other", () => {
  expect(unfiled([UNFILED_SAID])).toBe(true)
  expect(unfiled([UNFILED_SAID, HELD_LOCK])).toBe(false)
  expect(unfiled([HELD_LOCK])).toBe(false)
  expect(unfiled([])).toBe(false)
})

const SITS_NOWHERE = "nobody-sits-here"

function seatedSomewhere(): string {
  const named = readdirSync(join(ROOT, seatsAt(ROOT)))
  return named.find((one) => existsSync(join(ROOT, seatPathForName(one)))) ?? ""
}

const SITS_SOMEWHERE = seatedSomewhere()

async function statingAt(name: string): Promise<readonly Asking[]> {
  let asked: readonly Asking[] = []
  const landing: Landing = (_root, changes, _message) => {
    asked = changes
    return Promise.resolve({ refusals: [], code: EXIT.OPERATIONAL })
  }
  await statedSeat(ROOT, WHOLE, name, landing)
  return asked
}

test("a seat written over a page already there hands in the body it read", async () => {
  expect(SITS_SOMEWHERE).not.toBe("")

  const asked = await statingAt(SITS_SOMEWHERE)

  expect(asked.length).toBe(1)
  expect(asked[0]?.given).toHaveProperty("old")
})

test("a seat written where no page is there hands in no body it read", async () => {
  const asked = await statingAt(SITS_NOWHERE)

  expect(asked.length).toBe(1)
  expect(asked[0]?.given).not.toHaveProperty("old")
})

test("a seat whose landing committed and then found something wrong after it is written", async () => {
  const landing: Landing = () =>
    Promise.resolve({
      base: COMMITTED,
      landed: [],
      formatted: [],
      said: [],
      wrong: ["no workstation unit was weighed"],
      commit: COMMITTED,
    })
  expect(await statedSeat(ROOT, WHOLE, SITS_NOWHERE, landing)).toEqual({ kind: "wrote" })
})

test("a stop whose landing committed and then found something wrong after it took the page", async () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-landing-")
    writing(root, PAGE_AT, PAGE_BODY)
    const landing: Landing = () =>
      Promise.resolve({
        base: COMMITTED,
        landed: [],
        formatted: [],
        said: [],
        wrong: ["no workstation unit was weighed"],
        commit: COMMITTED,
      })
    expect(await tookSeat(root, STOPPED, "deliberate", landing)).toEqual({ kind: "took" })
  } finally {
    world.sweep()
  }
})
