import { expect, test } from "bun:test"
import { scratchWorld } from "../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { said as gitIn } from "../../git/running/git-running.module.code.ts"
import { pageInHistory, subagentPageInHistory } from "./subagent-page-history.module.code.ts"

const AT = "seat-system/subagents/pages/akasha-a38f63805f9b94edf.subagent.ts"

const AGENT = "01a05844-6e60-7000-b54c-4b14559df70b--a38f63805f9b94edf"

const HELD = "01a06d00-0000-7000-8000-000000000001"

function bodyOf(id: string, kind: string, agentId: string): string {
  return [
    'import type { Subagent } from "../subagent.page-type.types.ts"',
    "",
    "export const akashaA38f63805f9b94edf = {",
    `  id: ${JSON.stringify(id)},`,
    '  pageTypeSlug: "subagent",',
    '  slug: "akasha-a38f63805f9b94edf",',
    '  principalSeatName: "akasha",',
    '  assignmentSlug: "domain/akasha-system",',
    `  dispatchedAs: ${JSON.stringify(kind)},`,
    `  agentId: ${JSON.stringify(agentId)},`,
    "} as const satisfies Subagent",
    "",
  ].join("\n")
}

function repoIn(root: string): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  return root
}

function committed(root: string, why: string): undefined {
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", why])
}

function pageGone(root: string, at: string): undefined {
  gitIn(root, ["rm", "--quiet", at])
  gitIn(root, ["commit", "--quiet", "-m", "the page goes"])
}

function seeded(root: string, body: string): string {
  writing(root, AT, body)
  committed(root, "the page is put up")
  pageGone(root, AT)
  return root
}

test("a page taken away is read back out of the commit that wrote it", () => {
  const world = scratchWorld()
  try {
    const root = seeded(
      repoIn(world.rootFor("subagent-page-history-")),
      bodyOf(HELD, "Explore", AGENT)
    )
    expect(pageInHistory(root, AT)?.values).toMatchObject({
      id: HELD,
      slug: "akasha-a38f63805f9b94edf",
      principalSeatName: "akasha",
      assignmentSlug: "domain/akasha-system",
      dispatchedAs: "Explore",
      agentId: AGENT,
    })
  } finally {
    world.sweep()
  }
})

test("a path git holds no commit writing is answered as nothing", () => {
  const world = scratchWorld()
  try {
    const root = seeded(
      repoIn(world.rootFor("subagent-page-history-")),
      bodyOf(HELD, "Explore", AGENT)
    )
    expect(pageInHistory(root, "seat-system/subagents/pages/akasha-nowhere.subagent.ts")).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a path named as nothing is answered as nothing", () => {
  const world = scratchWorld()
  try {
    const root = seeded(
      repoIn(world.rootFor("subagent-page-history-")),
      bodyOf(HELD, "Explore", AGENT)
    )
    expect(pageInHistory(root, "")).toBe(null)
  } finally {
    world.sweep()
  }
})

test("the newest commit that wrote the page is the one read", () => {
  const world = scratchWorld()
  try {
    const root = repoIn(world.rootFor("subagent-page-history-"))
    writing(root, AT, bodyOf(HELD, "Explore", AGENT))
    committed(root, "the page is put up")
    writing(root, AT, bodyOf(HELD, "general-purpose", AGENT))
    committed(root, "the page says another kind")
    pageGone(root, AT)
    expect(pageInHistory(root, AT)?.values.dispatchedAs).toBe("general-purpose")
  } finally {
    world.sweep()
  }
})

test("a body that will not load is answered as nothing", () => {
  const world = scratchWorld()
  try {
    const root = seeded(repoIn(world.rootFor("subagent-page-history-")), "export const it = (\n")
    expect(pageInHistory(root, AT)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("a subagent is answered the page whose agent id is the one asked for", () => {
  const world = scratchWorld()
  try {
    const root = seeded(
      repoIn(world.rootFor("subagent-page-history-")),
      bodyOf(HELD, "Explore", AGENT)
    )
    expect(subagentPageInHistory(root, AT, AGENT)?.values.id).toBe(HELD)
  } finally {
    world.sweep()
  }
})

test("a page stating another agent id is answered as nothing", () => {
  const world = scratchWorld()
  try {
    const root = seeded(
      repoIn(world.rootFor("subagent-page-history-")),
      bodyOf(HELD, "Explore", "another--a38f63805f9b94edf")
    )
    expect(pageInHistory(root, AT)?.values.id).toBe(HELD)
    expect(subagentPageInHistory(root, AT, AGENT)).toBe(null)
  } finally {
    world.sweep()
  }
})

test("an agent id named as nothing is answered as nothing", () => {
  const world = scratchWorld()
  try {
    const root = seeded(
      repoIn(world.rootFor("subagent-page-history-")),
      bodyOf(HELD, "Explore", AGENT)
    )
    expect(subagentPageInHistory(root, AT, "")).toBe(null)
  } finally {
    world.sweep()
  }
})
