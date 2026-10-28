import { expect, test } from "bun:test"
import { color } from "akasha/design/interface/color/color.page-type.ts"
import { purple } from "akasha/design/interface/color/pages/purple.color.ts"
import { outcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.ts"
import { criticalFailure } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/critical-failure.outcome-tier.ts"
import { criticalSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/critical-success.outcome-tier.ts"
import { success } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/success.outcome-tier.ts"
import {
  type Keeping,
  type OutcomeCard,
  OutcomeCards,
  rollingFrames,
  seenIn,
  seenNow,
  tierAt,
  tierClass,
} from "akasha/story/world/stories/played/modules/played-outcome-card/played-outcome-card.module.code.tsx"
import { renderToStaticMarkup } from "react-dom/server"

const SEVEN = 7

const CARD: OutcomeCard = {
  actor: { name: "Nala", color: `${color.slug}/${purple.slug}` },
  action: "I turn the tables",
  skill: "Path of Willpower",
  actionDifficulty: "Easy",
  outcome: success.title,
  tier: `${outcomeTier.slug}/${success.slug}`,
  terms: "Path of Willpower +0",
  rollKey: null,
}

function keeping(): Keeping {
  const held = new Map<string, string>()
  return {
    getItem: (key) => held.get(key) ?? null,
    setItem: (key, value) => {
      held.set(key, value)
    },
  }
}

test("the seven tiers are placed worst first, each drawn in a color of its own", () => {
  expect(tierAt(`${outcomeTier.slug}/${criticalFailure.slug}`)).toBe(0)
  expect(tierAt(`${outcomeTier.slug}/${criticalSuccess.slug}`)).toBe(SEVEN - 1)
  const classes = Array.from({ length: SEVEN }, (_, place) => tierClass(place))
  expect(classes).not.toContain(null)
  expect(new Set(classes).size).toBe(SEVEN)
})

test("a roll passes through every tier, slowing, and lands on the one settled", () => {
  const frames = rollingFrames(4)
  expect(frames.at(-1)?.place).toBe(4)
  expect(frames.at(-2)?.place).not.toBe(4)
  expect(new Set(frames.map((one) => one.place)).size).toBe(SEVEN)
  const gaps = frames.slice(1).map((one, at) => one.at - (frames[at]?.at ?? 0))
  expect(gaps).toEqual(gaps.toSorted((a, b) => a - b))
  expect(frames.at(-1)?.at).toBeLessThan(2000)
})

test("a roll seen once is kept as seen", () => {
  const kept = keeping()
  expect(seenIn(kept, "a-seed")).toBe(false)
  seenNow(kept, "a-seed")
  expect(seenIn(kept, "a-seed")).toBe(true)
  expect(seenIn(kept, "another-seed")).toBe(false)
})

test("a card opens with the actor's name in its color, then the action, then the check", () => {
  const drawn = renderToStaticMarkup(<OutcomeCards cards={[CARD]} />)
  expect(drawn).toContain('<span class="font-semibold text-purple">Nala</span>')
  expect(drawn.indexOf("I turn the tables")).toBeLessThan(
    drawn.indexOf("(Path of Willpower · Easy)")
  )
  expect(drawn).toContain(`text-green"><span class="sr-only">${success.title}`)
})

test("a card naming no actor and no action opens with the check", () => {
  const drawn = renderToStaticMarkup(
    <OutcomeCards cards={[{ ...CARD, actor: null, action: null }]} />
  )
  expect(drawn).not.toContain("Nala")
  expect(drawn).not.toContain("pl-4")
})

test("a card whose path is hidden shows the difficulty alone", () => {
  const drawn = renderToStaticMarkup(<OutcomeCards cards={[{ ...CARD, skill: "" }]} />)
  expect(drawn).toContain("(Easy)")
})
