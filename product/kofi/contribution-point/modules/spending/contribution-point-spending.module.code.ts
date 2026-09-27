import { boostNotPublished } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/boost-not-published.web-phrase.ts"
import { boostOverBalance } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/boost-over-balance.web-phrase.ts"
import { boostPointsNotWhole } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/boost-points-not-whole.web-phrase.ts"
import { proposalOverBalance } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/proposal-over-balance.web-phrase.ts"

export const PROPOSAL_COST = 100

export type Refused = {
  readonly refused: string
  readonly fills?: Readonly<Record<string, string | number>>
}

const PUBLISHED = "published"

export type Boost = {
  readonly contributor: string
  readonly points: number
}

type Transaction = {
  readonly at: string
  readonly points: number
}

type Moved = {
  readonly boosts: readonly Boost[]
  readonly transaction: Transaction
  readonly balance: number
}

type Moving = { readonly moved: Moved } | Refused

function wholeAbove(points: number): boolean {
  return Number.isSafeInteger(points) && points > 0
}

function boostedWith(
  boosts: readonly Boost[],
  contributor: string,
  points: number
): readonly Boost[] {
  const rest = boosts.filter((one) => one.contributor !== contributor)
  const was = boosts.find((one) => one.contributor === contributor)
  const now = { contributor, points: (was?.points ?? 0) + points }
  return [...rest, now].sort((one, other) => other.points - one.points)
}

export function boosting(given: {
  readonly contributor: string
  readonly balance: number
  readonly boosts: readonly Boost[]
  readonly points: number
  readonly standing: string
  readonly at: string
}): Moving {
  if (!wholeAbove(given.points)) {
    return { refused: boostPointsNotWhole.slug }
  }
  if (given.standing !== PUBLISHED) {
    return { refused: boostNotPublished.slug, fills: { standing: given.standing } }
  }
  if (given.points > given.balance) {
    return {
      refused: boostOverBalance.slug,
      fills: { points: given.points, balance: given.balance },
    }
  }
  return {
    moved: {
      boosts: boostedWith(given.boosts, given.contributor, given.points),
      transaction: { at: given.at, points: -given.points },
      balance: given.balance - given.points,
    },
  }
}

export function proposing(given: {
  readonly contributor: string
  readonly balance: number
  readonly at: string
}): Moving {
  if (given.balance < PROPOSAL_COST) {
    return {
      refused: proposalOverBalance.slug,
      fills: { cost: PROPOSAL_COST, balance: given.balance },
    }
  }
  return {
    moved: {
      boosts: [{ contributor: given.contributor, points: PROPOSAL_COST }],
      transaction: { at: given.at, points: -PROPOSAL_COST },
      balance: given.balance - PROPOSAL_COST,
    },
  }
}

export function refunding(boosts: readonly Boost[], proposer: string): readonly Boost[] {
  const kept: Boost[] = []
  for (const one of boosts) {
    const points = one.contributor === proposer ? one.points - PROPOSAL_COST : one.points
    if (points > 0) kept.push({ contributor: one.contributor, points })
  }
  return kept
}
