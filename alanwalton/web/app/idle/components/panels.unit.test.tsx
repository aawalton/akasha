import { describe, expect, it } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"
import { ApotheosisPanel } from "~/idle/components/apotheosis-panel"
import { LegacyPerksPanel } from "~/idle/components/legacy-perks-panel"
import { normalizeGameState } from "../lib/core/accrual"
import { type GameState } from "../lib/core/types"
import { parseIdleSave } from "~/idle/lib/idle-save"
import type { IdleActions } from "~/idle/lib/use-idle-actions"
import fixture from "../lib/__fixtures__/scratch-state.json"

const state = normalizeGameState(parseIdleSave(fixture))

const noopActions: IdleActions = {
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
}

const unlocked: GameState = {
  ...state,
  legacyStars: 120,
  prestigeUnlocked: true,
  boonsUnlocked: true,
  perksUnlocked: true,
  perkPointsSpent: 0,
  apotheosisUnlocked: true,
  starsConverted: 50,
  eternityPoints: 2,
}

describe("data-rich panels render without crashing", () => {
  it("interactive G/H panels render every unlocked branch without crashing", () => {
    const html = renderToStaticMarkup(
      <>
        <LegacyPerksPanel state={unlocked} actions={noopActions} />
        <ApotheosisPanel state={unlocked} actions={noopActions} />
      </>
    )
    expect(html).toContain("Legacy Perks")
    expect(html).toContain("Surge")
    expect(html).toContain("Apotheosis")
    expect(html).toContain("Ascend to Eternity")
    expect(html).toContain('class="perk-buy bg-surface-1"')
    expect(html).toContain('class="apo-btn bg-surface-1"')
  })

  it("an owned perk renders as a non-interactive badge, never a button (#14088)", () => {
    const owned: GameState = { ...unlocked, perks: ["surge"] }
    const html = renderToStaticMarkup(<LegacyPerksPanel state={owned} actions={noopActions} />)
    expect(html).toContain("✓")
    expect(html).toContain('<span class="perk-buy owned bg-surface-1"')
    expect(html).not.toContain('<button type="button" class="perk-buy owned')
  })
})
