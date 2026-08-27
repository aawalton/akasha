import { afterEach, describe, expect, test } from "bun:test"
import { cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { normalizeGameState } from "../lib/core/accrual"
import { type GameState } from "../lib/core/types"
import { parseIdleSave } from "~/idle/lib/idle-save"
import fixture from "../lib/__fixtures__/scratch-state.json"
import { ActiveBoosts } from "./active-boosts"

const state = normalizeGameState(parseIdleSave(fixture))

function dormantState(): GameState {
  return {
    resource: 0,
    teammates: [
      {
        slug: "aura",
        name: "Aura",
        color: "var(--blue)",
        portrait: "",
        flavor: "",
        cost: 0,
        rate: 1,
        rank: 1,
        level: 1,
        stage: "Initiating",
      },
    ],
    activeTeam: [],
    lastTickAt: 0,
    legacyStars: 0,
    gacha: { girls: { aura: { stars: 0, dupeProgress: 0, images: [] } }, cycleDraws: 0 },
  }
}

afterEach(cleanup)

describe("ActiveBoosts", () => {
  test("renders each LIVE whole-team factor as `Name ×value`", () => {
    render(<ActiveBoosts state={state} />)
    expect(screen.getByText(/Legacy/)).toBeTruthy()
    expect(screen.getByText(/×3\.00/)).toBeTruthy()
  })

  test("Legacy chip surfaces the raw legacyStars count (#14780)", () => {
    render(<ActiveBoosts state={state} />)
    expect(screen.getByText(/20★/)).toBeTruthy()
  })

  test("omits DORMANT (×1.00) factors — Overdrive is off in the fixture", () => {
    render(<ActiveBoosts state={state} />)
    expect(screen.queryByText(/Overdrive/)).toBeNull()
  })

  test("renders nothing when no factor is live", () => {
    const { container } = render(<ActiveBoosts state={dormantState()} />)
    expect(container.textContent).toBe("")
  })
})
