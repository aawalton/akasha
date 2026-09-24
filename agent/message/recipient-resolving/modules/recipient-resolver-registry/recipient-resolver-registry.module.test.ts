import { expect, test } from "bun:test"
import {
  assembleRecipientResolverSpecs,
  gameSeatSpecs,
  gameSeatsIn,
} from "akasha/agent/message/recipient-resolving/modules/recipient-resolver-registry/recipient-resolver-registry.module.code.ts"
import { ruleMatches } from "akasha/agent/message/recipient-resolving/modules/seat-wake-rules/seat-wake-rules.module.code.ts"
import { handlerSeatName } from "akasha/agent/seat/name/modules/compose-seat-name/compose-seat-name.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { ACTION_BAR_SENDER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import { theTower } from "akasha/story/game/pages/the-tower/the-tower.game.ts"

const ROOT = rootOf(import.meta.dir)

const MASTER = theTower.coordinatorAgent

const BUILDER = "iris-world-builder-the-tower"

function towerSpecs() {
  return gameSeatSpecs(gameSeatsIn(ROOT).filter((one) => one.game === theTower.slug))
}

function heard(name: string, sender: string): boolean {
  const spec = towerSpecs().find((one) => one.name === name)
  if (spec === undefined) return false
  return spec.wakeSources.some((rule) => ruleMatches(rule, { sender, content: "" }))
}

test("the tower's game master seat and its world builder seat each have a spec", () => {
  expect(towerSpecs().map((one) => one.name)).toEqual([MASTER, BUILDER])
})

test("the game master seat is started by the action bar and by its world builder", () => {
  expect(heard(MASTER, `agent:${ACTION_BAR_SENDER}`)).toBe(true)
  expect(heard(MASTER, `agent:${BUILDER}`)).toBe(true)
  expect(heard(MASTER, "agent:someone-else")).toBe(false)
})

test("the world builder seat is started by its game master alone", () => {
  expect(heard(BUILDER, `agent:${MASTER}`)).toBe(true)
  expect(heard(BUILDER, `agent:${ACTION_BAR_SENDER}`)).toBe(false)
})

test("the text handlers' specs sit beside the game seats", async () => {
  const names = (await assembleRecipientResolverSpecs(async () => [])).map((one) => one.name)
  expect(names).toContain(MASTER)
  expect(names).toContain(handlerSeatName("ki", ROOT))
  expect(names).toContain(handlerSeatName("jenny", ROOT))
})
