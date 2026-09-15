import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  foldersOf,
  followingStops,
  ownOf,
  stoppedOwnIdsIn,
} from "akasha/agent/model/gateway/modules/subagent-stops/subagent-stops.module.code.ts"
import { SCRATCH_AT } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { mergeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

const SEAT = "01a09581-cb35-7000-b00f-7156d6b3ce13"

const OTHER_SEAT = "01a09140-fee5-7000-b6cc-66e5ce9adce8"

const OWN = "a70d67f8ee96115ae"

const PAGE = "agent/subagent/pages/amy-a70d67f8ee96115ae/amy-a70d67f8ee96115ae.subagent.ts"

const SETTLE_MS = 20

function pageBody(agentId: string | null): string {
  const stated = agentId === null ? "" : `, agentId: "${agentId}"`
  return `export const page = { type: "subagent", slug: "amy-a70d67f8ee96115ae"${stated} } as const\n`
}

function rootWith(agentId: string | null): string {
  const root = mkdtempSync(join(SCRATCH_AT, "amy-subagent-stops-"))
  mkdirSync(dirname(join(root, PAGE)), { recursive: true })
  writeFileSync(join(root, PAGE), pageBody(agentId))
  return root
}

function settled(): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(undefined), SETTLE_MS * 10)
  })
}

test("the id a subagent runs under is read after the seat's id and the mark", () => {
  expect(ownOf(`${SEAT}--${OWN}`, SEAT)).toBe(OWN)
})

test("an agent id of another seat names no own id", () => {
  expect(ownOf(`${OTHER_SEAT}--${OWN}`, SEAT)).toBeNull()
})

test("a seat's own id names no own id", () => {
  expect(ownOf(SEAT, SEAT)).toBeNull()
})

test("an agent id ending at the mark names no own id", () => {
  expect(ownOf(`${SEAT}--`, SEAT)).toBeNull()
})

test("an empty seat id holds nothing", () => {
  expect(ownOf(`--${OWN}`, "")).toBeNull()
})

test("a subagent nobody stopped is held by nothing", () => {
  const root = rootWith(`${SEAT}--${OWN}`)
  try {
    expect(stoppedOwnIdsIn(root, SEAT, [PAGE]).has(OWN)).toBe(false)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a subagent whose stop is written beside its page is held", () => {
  const root = rootWith(`${SEAT}--${OWN}`)
  try {
    mergeUncommitted(root, PAGE, { stopped: true })
    expect(stoppedOwnIdsIn(root, SEAT, [PAGE]).has(OWN)).toBe(true)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a subagent of another seat is held by nothing here", () => {
  const root = rootWith(`${OTHER_SEAT}--${OWN}`)
  try {
    mergeUncommitted(root, PAGE, { stopped: true })
    expect(stoppedOwnIdsIn(root, SEAT, [PAGE]).size).toBe(0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a page stating no agent id holds nothing", () => {
  const root = rootWith(null)
  try {
    mergeUncommitted(root, PAGE, { stopped: true })
    expect(stoppedOwnIdsIn(root, SEAT, [PAGE]).size).toBe(0)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("the folders followed are the index value folder and each page's folder", () => {
  const folders = foldersOf("/nowhere", [PAGE])
  expect(folders.size).toBe(2)
  expect(folders.has(dirname(join("/nowhere", PAGE)))).toBe(true)
})

test("a stop written after the start is held once the change settles", async () => {
  const root = rootWith(`${SEAT}--${OWN}`)
  const stops = followingStops(root, SEAT, () => [PAGE], SETTLE_MS)
  try {
    expect(stops.has(OWN)).toBe(false)
    mergeUncommitted(root, PAGE, { stopped: true })
    await settled()
    expect(stops.has(OWN)).toBe(true)
  } finally {
    stops.stop()
    rmSync(root, { recursive: true, force: true })
  }
})

test("a stopped subagent stays held after its page goes", () => {
  const root = rootWith(`${SEAT}--${OWN}`)
  mergeUncommitted(root, PAGE, { stopped: true })
  let pages: readonly string[] = [PAGE]
  const stops = followingStops(
    root,
    SEAT,
    () => pages,
    SETTLE_MS,
    () => undefined
  )
  try {
    expect(stops.has(OWN)).toBe(true)
    pages = []
    rmSync(join(root, PAGE), { force: true })
    const fresh = followingStops(
      root,
      SEAT,
      () => pages,
      SETTLE_MS,
      () => undefined
    )
    expect(fresh.has(OWN)).toBe(false)
    expect(stops.has(OWN)).toBe(true)
    fresh.stop()
  } finally {
    stops.stop()
    rmSync(root, { recursive: true, force: true })
  }
})

test("a seat no name is read for asks for no page", () => {
  const root = rootWith(`${SEAT}--${OWN}`)
  const asked: string[] = []
  mergeUncommitted(root, PAGE, { stopped: true })
  const stops = followingStops(
    root,
    SEAT,
    () => [PAGE],
    SETTLE_MS,
    (_root, _name, _seat, own) => {
      asked.push(own)
      return undefined
    }
  )
  try {
    stops.taken?.(OWN)
    stops.taken?.(OWN)
    expect(asked).toEqual([])
  } finally {
    stops.stop()
    rmSync(root, { recursive: true, force: true })
  }
})
