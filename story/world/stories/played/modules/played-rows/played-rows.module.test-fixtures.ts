import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { stepStatus } from "akasha/story/chapter/step-status/step-status.page-type.ts"

export const NO_PROSE: ReadonlyMap<string, string> = new Map()

export const turnPage = (values: Record<string, unknown>): Page =>
  asPage({ pageTypeSlug: "story-turn-played", ...values })

export const turnsNumbering = (count: number): readonly Page[] =>
  Array.from({ length: count }, (_unused, index) =>
    turnPage({ id: `id-${index}`, position: index + 1 })
  )

export const at = (step: string): string => `${stepStatus.slug}/${step}`

export const read = turnPage({ id: "a", slug: "saga-01", position: 1, stepStatus: at("player") })

export const making = turnPage({
  id: "b",
  slug: "saga-02",
  position: 2,
  stepStatus: at("reviewers"),
  action: "I open the gate",
})

export const seat = (turnState: string): Page =>
  asPage({ pageTypeSlug: "seat", id: turnState, turnState: `seat-turn-state/${turnState}` })
