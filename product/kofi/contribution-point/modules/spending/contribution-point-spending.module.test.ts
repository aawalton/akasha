import { expect, test } from "bun:test"
import {
  type Boost,
  boosting,
  PROPOSAL_COST,
  proposing,
  refunding,
} from "akasha/product/kofi/contribution-point/modules/spending/contribution-point-spending.module.code.ts"

const ONE = "contributor/contributor-one"

const TWO = "contributor/contributor-two"

const AT = "2026-09-21T00:00:00.000Z"

function boosts(given: readonly Boost[] = []): readonly Boost[] {
  return given
}

test("points a contributor holds reach a published request", () => {
  const said = boosting({
    contributor: ONE,
    balance: 500,
    boosts: boosts(),
    points: 200,
    standing: "published",
    at: AT,
  })
  expect("moved" in said).toBe(true)
  if (!("moved" in said)) return
  expect(said.moved.balance).toBe(300)
  expect(said.moved.transaction).toEqual({ at: AT, points: -200 })
  expect(said.moved.boosts).toEqual([{ contributor: ONE, points: 200 }])
})

test("a request at another standing takes no boost", () => {
  for (const standing of ["proposed", "completed", "denied"]) {
    const said = boosting({
      contributor: ONE,
      balance: 500,
      boosts: boosts(),
      points: 200,
      standing,
      at: AT,
    })
    expect("refused" in said).toBe(true)
    expect("refused" in said ? said.refused : "").toContain(standing)
  }
})

test("more points than are held reach no request", () => {
  const said = boosting({
    contributor: ONE,
    balance: 100,
    boosts: boosts(),
    points: 200,
    standing: "published",
    at: AT,
  })
  expect("refused" in said).toBe(true)
})

test("every balance a contributor holds reaches a request", () => {
  const said = boosting({
    contributor: ONE,
    balance: 200,
    boosts: boosts(),
    points: 200,
    standing: "published",
    at: AT,
  })
  expect("moved" in said && said.moved.balance).toBe(0)
})

test("points that are not a whole number above nothing reach no request", () => {
  for (const points of [0, -5, 1.5, Number.NaN]) {
    const said = boosting({
      contributor: ONE,
      balance: 500,
      boosts: boosts(),
      points,
      standing: "published",
      at: AT,
    })
    expect("refused" in said).toBe(true)
  }
})

test("one contributor boosting a request twice is one boost of the points added up", () => {
  const said = boosting({
    contributor: ONE,
    balance: 500,
    boosts: boosts([{ contributor: ONE, points: 50 }]),
    points: 70,
    standing: "published",
    at: AT,
  })
  expect("moved" in said ? said.moved.boosts : []).toEqual([{ contributor: ONE, points: 120 }])
})

test("boosts are answered most points first", () => {
  const said = boosting({
    contributor: ONE,
    balance: 500,
    boosts: boosts([{ contributor: TWO, points: 90 }]),
    points: 10,
    standing: "published",
    at: AT,
  })
  expect("moved" in said ? said.moved.boosts : []).toEqual([
    { contributor: TWO, points: 90 },
    { contributor: ONE, points: 10 },
  ])
})

test("opening a request costs a hundred points and boosts that request with them", () => {
  const said = proposing({ contributor: ONE, balance: 100, at: AT })
  expect("moved" in said).toBe(true)
  if (!("moved" in said)) return
  expect(said.moved.balance).toBe(0)
  expect(said.moved.transaction).toEqual({ at: AT, points: -PROPOSAL_COST })
  expect(said.moved.boosts).toEqual([{ contributor: ONE, points: PROPOSAL_COST }])
})

test("a contributor under a hundred points opens no request", () => {
  const said = proposing({ contributor: ONE, balance: 99, at: AT })
  expect("refused" in said).toBe(true)
})

test("a denial gives back every boost but the hundred the proposer paid", () => {
  const given = refunding(
    [
      { contributor: ONE, points: 350 },
      { contributor: TWO, points: 40 },
    ],
    ONE
  )
  expect(given).toEqual([
    { contributor: ONE, points: 250 },
    { contributor: TWO, points: 40 },
  ])
})

test("a proposer who boosted nothing further is given nothing back", () => {
  expect(refunding([{ contributor: ONE, points: PROPOSAL_COST }], ONE)).toEqual([])
})
