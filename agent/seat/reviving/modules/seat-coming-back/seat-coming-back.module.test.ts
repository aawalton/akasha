import { expect, test } from "bun:test"
import type { SeatStated } from "akasha/agent/seat/declaration/modules/seat-stating/seat-stating.module.code.ts"
import { seatPathForName } from "akasha/agent/seat/page/modules/seat-reading/seat-reading.module.code.ts"
import {
  alreadyThere,
  heldBefore,
  type StatingSeat,
  saidOfBack,
  seatBackFromHistory,
  statedIn,
  tookAway,
} from "akasha/agent/seat/reviving/modules/seat-coming-back/seat-coming-back.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { said } from "akasha/git/modules/running/git-running.module.code.ts"

const NAME = "aelwyn"

const AWAY = "nimue"

const ID = "01a090ed-0ccf-7000-b711-370c53dfcbb8"

const SESSION = "0324cc21-a726-49d2-b021-97c14526d4ec"

const AT = seatPathForName(NAME)

const ELSEWHERE = `seat-system/seats/pages/${NAME}/${NAME}.seat.ts`

const BODY = [
  'import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"',
  "",
  `export const ${NAME} = {`,
  `  id: "${ID}",`,
  '  type: "seat",',
  `  slug: "${NAME}",`,
  `  persona: "${NAME}",`,
  '  assignmentSlug: "initiative/aelwyn-strength-training",',
  '  role: "coach",',
  '  person: "alan",',
  '  startMode: "interactive",',
  "  onCall: true,",
  '  registrationAccount: "aawalton",',
  `  claudeCodeSessionUuid: "${SESSION}",`,
  "} as const satisfies Seat",
  "",
].join("\n")

const WHOLE: SeatStated = {
  agentId: ID,
  persona: NAME,
  domain: "aelwyn-strength-training",
  assignment: "initiative/aelwyn-strength-training",
  role: "coach",
  principal: "alan",
  mode: "interactive",
  registration: "aawalton",
  onCall: true,
  session: SESSION,
  parentName: null,
}

function stoppedAt(root: string, at: string): string {
  said(root, ["init", "--quiet"])
  said(root, ["config", "user.email", "seat@akasha"])
  said(root, ["config", "user.name", "akasha"])
  writing(root, at, BODY)
  said(root, ["add", "-A"])
  said(root, ["commit", "-q", "-m", `${NAME}: the seat is in akasha as what it states`])
  said(root, ["rm", "-q", at])
  said(root, ["commit", "-q", "-m", `${NAME} stopped, deliberate, so its page goes`])
  return said(root, ["rev-parse", "HEAD"]).trim()
}

function refusingToState(): StatingSeat {
  return () => {
    throw new Error("nothing is composed where nothing came back")
  }
}

test("a seat comes back as the commit that took its page away left that page", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    const took = stoppedAt(root, AT)
    expect(tookAway(root, NAME)).toBe(took)
    expect(heldBefore(root, NAME)).toEqual({ at: AT, commit: took, body: BODY })
  } finally {
    world.sweep()
  }
})

test("a page taken away from another folder brings nothing back", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    stoppedAt(root, ELSEWHERE)
    expect(tookAway(root, NAME)).toBeNull()
    expect(heldBefore(root, NAME)).toBeNull()
  } finally {
    world.sweep()
  }
})

test("a name no commit took a page away from brings nothing back", () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    stoppedAt(root, AT)
    expect(tookAway(root, AWAY)).toBeNull()
    expect(heldBefore(root, AWAY)).toBeNull()
  } finally {
    world.sweep()
  }
})

test("what a page said under the names it had is read as what a seat states", () => {
  expect(statedIn(BODY)).toEqual(WHOLE)
})

test("a body that will not read states nothing", () => {
  expect(statedIn("this is no page")).toBeNull()
})

test("the seat is composed again from what its page said rather than written back word for word", async () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    const took = stoppedAt(root, AT)
    const taken: SeatStated[] = []
    const names: string[] = []
    const stating: StatingSeat = (_root, whole, seatName) => {
      taken.push(whole)
      names.push(seatName)
      return Promise.resolve({ kind: "wrote" })
    }
    const back = await seatBackFromHistory(root, NAME, [], stating)
    expect(back?.commit).toBe(took)
    expect(names).toEqual([NAME])
    expect(taken).toEqual([WHOLE])
  } finally {
    world.sweep()
  }
})

test("nothing is composed where no commit took that seat's page away", async () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    stoppedAt(root, AT)
    expect(await seatBackFromHistory(root, AWAY, [], refusingToState())).toBeNull()
  } finally {
    world.sweep()
  }
})

test("a seat whose page is there already brings nothing back", async () => {
  const world = scratchWorld()
  try {
    const root = world.rootFor("seat-coming-back-")
    stoppedAt(root, AT)
    writing(root, AT, BODY)
    expect(alreadyThere(root, AT)).toBe(true)
    expect(await seatBackFromHistory(root, NAME, [], refusingToState())).toBeNull()
  } finally {
    world.sweep()
  }
})

test("what the commit says names the commit the page came back from", () => {
  expect(saidOfBack(NAME, "abc123")).toContain("abc123")
})
