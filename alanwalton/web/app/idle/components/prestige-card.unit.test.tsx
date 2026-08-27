import { describe, expect, it } from "bun:test"
import { renderToStaticMarkup } from "react-dom/server"
import { PrestigeCard } from "~/idle/components/prestige-card"
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

const dormant: GameState = {
  ...state,
  perksUnlocked: false,
  apotheosisUnlocked: false,
}

describe("PrestigeCard — the extracted prestige card (#14183)", () => {
  it("titles the card with the mechanic-family name and hosts the two spend-side subsections", () => {
    const html = renderToStaticMarkup(<PrestigeCard state={unlocked} actions={noopActions} />)
    expect(html).toContain("Prestige")
    expect(html).toContain('class="prestige"')
    expect(html).not.toContain("Ascension")
    expect(html).toContain("Legacy Perks")
    expect(html).toContain("Apotheosis")
  })

  it("hides the whole card (renders nothing) while both latches are dormant (#14724 bug fix)", () => {
    const html = renderToStaticMarkup(<PrestigeCard state={dormant} actions={noopActions} />)
    expect(html).toBe("")
    expect(html).not.toContain("Prestige")
    expect(html).not.toContain('class="prestige"')
    expect(html).not.toContain("Legacy Perks")
    expect(html).not.toContain("Apotheosis")
  })
})
