import { afterEach, describe, expect, spyOn, test } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { gainedStars } from "../lib/core/accrual"
import { ASCEND_MIN } from "../lib/core/constants"
import { drawCost } from "../lib/core/gacha/state"
import { displayedResource, totalRate } from "../lib/core/rate"
import { type GachaGirl, type GachaState, type GameState, type Teammate } from "../lib/core/types"
import { formatShortNumber as fmt } from "@shared/pages-core/property-types/number"
import * as drawVerb from "~/idle/lib/idle-draw-verb"
import type { IdleActions } from "~/idle/lib/use-idle-actions"
import { UniversalTitleBar } from "./universal-title-bar"

const NOW = 5_000_000

function mkTeammate(over: Partial<Teammate> & { slug: string; name: string }): Teammate {
  return {
    color: "var(--blue)",
    portrait: "",
    flavor: "",
    cost: 0,
    rate: 1,
    rank: 1,
    level: 1,
    stage: "Initiating",
    ...over,
  }
}

function rosterState(slugs: readonly string[]): GachaState {
  const girls: Record<string, GachaGirl> = {}
  for (const slug of slugs) girls[slug] = { stars: 0, dupeProgress: 0, images: [] }
  return { girls, cycleDraws: 0 }
}

function base(over: Partial<GameState> = {}): GameState {
  const teammates = over.teammates ?? [mkTeammate({ slug: "aura", name: "Aura" })]
  return {
    resource: 0,
    teammates,
    lastTickAt: NOW,
    gacha: rosterState(teammates.map((t) => t.slug)),
    ...over,
  }
}

function noopActions(over: Partial<IdleActions> = {}): IdleActions {
  return {
    error: null,
    dispatch: () => {},
    train: () => {},
    selectImage: () => {},
    setTeam: () => {},
    ascend: () => {},
    specialize: () => {},
    unspecialize: () => {},
    perk: () => {},
    apotheosis: () => {},
    ...over,
  }
}

afterEach(cleanup)

describe("UniversalTitleBar", () => {
  test("shows the live Moments and Moments/s readouts via fmt", () => {
    const s = base({ resource: 12_345 })
    render(<UniversalTitleBar state={s} now={NOW} actions={noopActions()} />)
    expect(screen.getByText(fmt(displayedResource(s, NOW)))).toBeTruthy()
    expect(screen.getByText(`${fmt(totalRate(s))}/s`)).toBeTruthy()
  })

  test("Draw is disabled below cost and fires single-flight runDraw when affordable", () => {
    const runDraw = spyOn(drawVerb, "runDraw").mockImplementation(() => Promise.resolve())

    const poor = base({ resource: 0 })
    expect(displayedResource(poor, NOW)).toBeLessThan(drawCost(poor))
    const { unmount } = render(<UniversalTitleBar state={poor} now={NOW} actions={noopActions()} />)
    expect(screen.getByRole("button", { name: /Draw/ }).hasAttribute("disabled")).toBe(true)
    unmount()

    const rich = base({ resource: 1_000_000_000 })
    expect(displayedResource(rich, NOW)).toBeGreaterThanOrEqual(drawCost(rich))
    render(<UniversalTitleBar state={rich} now={NOW} actions={noopActions()} />)
    const draw = screen.getByRole("button", { name: /Draw/ })
    expect(draw.hasAttribute("disabled")).toBe(false)
    fireEvent.click(draw)
    expect(runDraw).toHaveBeenCalledTimes(1)
    runDraw.mockRestore()
  })

  test("Ascend shows the X/threshold gate label and is disabled below ASCEND_MIN", () => {
    const s = base()
    render(<UniversalTitleBar state={s} now={NOW} actions={noopActions()} />)
    const ascend = screen.getByRole("button", { name: /Ascend/ })
    expect(ascend.textContent).toContain(`${fmt(1)}/${fmt(ASCEND_MIN)}`)
    expect(ascend.hasAttribute("disabled")).toBe(true)
  })

  test("Ascend surfaces the +N★ star gain when claimable (#14780)", () => {
    const s = base({
      prestigeUnlocked: true,
      teammates: [mkTeammate({ slug: "aura", name: "Aura", rank: ASCEND_MIN })],
    })
    render(<UniversalTitleBar state={s} now={NOW} actions={noopActions()} />)
    const ascend = screen.getByRole("button", { name: /Ascend/ })
    expect(ascend.textContent).toContain(`+${fmt(gainedStars(s))}★`)
    expect(ascend.textContent).not.toContain("/")
  })

  test("Ascend arms then confirms — first click flips label, second calls actions.ascend", () => {
    let ascendCalls = 0
    const actions = noopActions({
      ascend: () => {
        ascendCalls += 1
      },
    })
    const s = base({
      prestigeUnlocked: true,
      teammates: [mkTeammate({ slug: "aura", name: "Aura", rank: ASCEND_MIN })],
    })
    render(<UniversalTitleBar state={s} now={NOW} actions={actions} />)
    const ascend = screen.getByRole("button", { name: /Ascend/ })
    expect(ascend.hasAttribute("disabled")).toBe(false)

    fireEvent.click(ascend)
    expect(ascendCalls).toBe(0)
    const confirm = screen.getByRole("button", { name: /Confirm/ })
    expect(confirm.textContent).toContain("Confirm")

    fireEvent.click(confirm)
    expect(ascendCalls).toBe(1)
  })
})
