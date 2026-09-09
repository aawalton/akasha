import { expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import { writing } from "@akasha/command-system/scratching/testing"
import {
  agentIdOf,
  bodyOf,
  pathOf,
  slugOf,
  took,
} from "../subagents/presence/subagent-presence.module.code.ts"
import {
  committed,
  filedNow,
  HELD_ASSIGNMENT,
  HELD_ID,
  OWN,
  pageGone,
  SEAT_ID,
  seated,
  seeing,
} from "./subagent-page.module.test-fixtures.ts"

function heldInHistory(root: string, kind: string): undefined {
  const slug = slugOf("akasha", OWN)
  const at = pathOf(slug)
  writing(root, at, bodyOf(slug, "akasha", HELD_ASSIGNMENT, kind, agentIdOf(SEAT_ID, OWN), HELD_ID))
  committed(root, "the page was there")
  pageGone(root, at)
}

function heldNow(root: string, dispatchedAs: string, id: string): string {
  const slug = slugOf("akasha", OWN)
  const held = agentIdOf(SEAT_ID, OWN)
  const at = pathOf(slug)
  writing(root, at, bodyOf(slug, "akasha", HELD_ASSIGNMENT, dispatchedAs, held, id))
  filedNow(root, at, slug, id)
  return slug
}

test("a seat with no subagent page is read as running no subagent", () => {
  const world = scratchWorld()
  try {
    expect(seeing(seated(world.rootFor("subagent-page-")), SEAT_ID)).toEqual([])
  } finally {
    world.sweep()
  }
})

test("a page held only in history is read as no subagent at work", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-page-"))
    heldInHistory(root, "Explore")
    expect(seeing(root, SEAT_ID)).toEqual([])
  } finally {
    world.sweep()
  }
})

test("a page carrying the kind it had is read as a subagent at work with that kind", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-page-"))
    const slug = heldNow(root, "Explore", HELD_ID)
    expect(seeing(root, SEAT_ID)).toEqual([{ name: slug, dispatchedAs: "Explore" }])
  } finally {
    world.sweep()
  }
})

test("the page taken down at a stop is read as no subagent at work", async () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-page-"))
    heldNow(root, "Explore", HELD_ID)
    committed(root, "the page was there")
    expect(await took(root, "akasha", OWN)).toEqual({ went: true })
    expect(seeing(root, SEAT_ID)).toEqual([])
  } finally {
    world.sweep()
  }
})

test("a seat the index carries no page for is read as running no subagent", () => {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-page-"))
    expect(seeing(root, "01a05844-6e60-7000-b54c-4b14559df70c")).toEqual([])
  } finally {
    world.sweep()
  }
})
