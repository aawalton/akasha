import { expect, test } from "bun:test"
import { seatPathForName } from "akasha/agent/seat/page/modules/seat-reading/seat-reading.module.code.ts"
import {
  alreadyThere,
  heldBefore,
  type Landing,
  saidOfBack,
  seatBackFromHistory,
  tookAway,
} from "akasha/agent/seat/reviving/modules/seat-coming-back/seat-coming-back.module.code.ts"
import { EXIT } from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"
import { scratchWorld } from "akasha/util/fs/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/util/fs/modules/scratching/scratching.module.test-fixtures.ts"

const NAME = "athena"

const AWAY = "nimue"

const BODY = 'export const athena = { id: "01a05e00-0000-7000-8000-000000000001" }\n'

const AT = seatPathForName(NAME)

const PUT = "change-mechanical-file/add-file"

function stopped(root: string): string {
  said(root, ["init", "--quiet"])
  said(root, ["config", "user.email", "seat@akasha"])
  said(root, ["config", "user.name", "akasha"])
  writing(root, AT, BODY)
  said(root, ["add", "-A"])
  said(root, ["commit", "-q", "-m", `${NAME}: the seat is in akasha as what it states`])
  said(root, ["rm", "-q", AT])
  said(root, ["commit", "-q", "-m", `${NAME} stopped, deliberate, so its page goes`])
  return said(root, ["rev-parse", "HEAD"]).trim()
}

test("a seat comes back as the commit that took its page away left that page", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    const took = stopped(root)
    expect(tookAway(root, AT)).toBe(took)
    expect(heldBefore(root, AT)).toEqual({ at: AT, commit: took, body: BODY })
  } finally {
    world.sweep()
  }
})

test("a name no commit took a page away from brings nothing back", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    stopped(root)
    expect(tookAway(root, seatPathForName(AWAY))).toBeNull()
    expect(heldBefore(root, seatPathForName(AWAY))).toBeNull()
  } finally {
    world.sweep()
  }
})

test("the page coming back lands as a change carrying the body that commit held", async () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    const took = stopped(root)
    let asked: readonly Asking[] = []
    let message = ""
    const landing: Landing = (_done, _root, changes, saying) => {
      asked = changes
      message = saying
      return Promise.resolve({ refusals: [], code: EXIT.OK })
    }
    const back = await seatBackFromHistory(root, NAME, [], landing)
    expect(back?.commit).toBe(took)
    expect(asked).toEqual([{ at: PUT, given: { at: AT, body: BODY } }])
    expect(message).toBe(saidOfBack(NAME, took))
  } finally {
    world.sweep()
  }
})

test("nothing lands where no commit took that seat's page away", async () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    stopped(root)
    const landing: Landing = () => {
      throw new Error("nothing lands where nothing was taken away")
    }
    expect(await seatBackFromHistory(root, AWAY, [], landing)).toBeNull()
  } finally {
    world.sweep()
  }
})

test("a seat whose page is there already brings nothing back", async () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    stopped(root)
    writing(root, AT, BODY)
    expect(alreadyThere(root, AT)).toBe(true)
    const landing: Landing = () => {
      throw new Error("nothing lands over a page that is there already")
    }
    expect(await seatBackFromHistory(root, NAME, [], landing)).toBeNull()
  } finally {
    world.sweep()
  }
})
