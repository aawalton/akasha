import { describe, expect, test } from "bun:test"
import { type Row, rowOf } from "../exercise-rows/exercise-rows.module.code.ts"
import {
  bindsFocus,
  constraintsIn,
  equipmentIn,
  focusTagsOf,
} from "./coaching-context.module.code.ts"

const CONSTRAINTS: readonly Row[] = [
  rowOf({
    id: "1",
    slug: "db-ceiling",
    title: "30 lb DB ceiling",
    coachingConstraintKind: "equipment-ceiling",
    focusTags: ["push", "pull"],
  }),
  rowOf({
    id: "2",
    slug: "air-quality",
    title: "Air quality is a hard medical gate",
    coachingConstraintKind: "medical-gate",
    focusTags: ["all"],
  }),
  rowOf({ id: "3", slug: "bare", title: "Untagged", coachingConstraintKind: "programming-cue" }),
]

describe("which constraints bind a focus", () => {
  test("the fixture holds three constraints, so an empty one cannot read clean", () => {
    expect(CONSTRAINTS.length).toBe(3)
  })

  test("a constraint tagged with the focus binds it", () => {
    const [first] = CONSTRAINTS
    expect(first).toBeDefined()
    expect(bindsFocus(first as Row, "push")).toBe(true)
    expect(bindsFocus(first as Row, "legs")).toBe(false)
  })

  test("a constraint tagged with all binds whichever focus is settled", () => {
    const gate = CONSTRAINTS[1]
    expect(gate).toBeDefined()
    expect(bindsFocus(gate as Row, "legs")).toBe(true)
  })

  test("every constraint binds where no focus is settled", () => {
    expect(constraintsIn(CONSTRAINTS, null).length).toBe(3)
  })

  test("a constraint tagged with nothing binds no settled focus", () => {
    const bare = CONSTRAINTS[2]
    expect(bare).toBeDefined()
    expect(focusTagsOf(bare as Row)).toEqual([])
    expect(bindsFocus(bare as Row, "push")).toBe(false)
  })

  test("a legs day is bound by the gate alone", () => {
    expect(constraintsIn(CONSTRAINTS, "legs").map((one) => one.title)).toEqual([
      "Air quality is a hard medical gate",
    ])
  })

  test("a constraint carries its kind and its tags through", () => {
    const [held] = constraintsIn(CONSTRAINTS, "push")
    expect(held?.kind).toBe("equipment-ceiling")
    expect(held?.focusTags).toEqual(["push", "pull"])
    expect(held?.body).toBeNull()
  })
})

describe("what kit stands", () => {
  test("a piece of kit saying nothing about whether it is there is there", () => {
    const [held] = equipmentIn([rowOf({ id: "1", slug: "db", title: "Dumbbells" })])
    expect(held?.available).toBe(true)
    expect(held?.category).toBeNull()
  })

  test("a piece of kit saying it is gone is gone", () => {
    const [held] = equipmentIn([
      rowOf({ id: "1", slug: "db", title: "Dumbbells", available: false, category: "dumbbells" }),
    ])
    expect(held?.available).toBe(false)
    expect(held?.category).toBe("dumbbells")
  })

  test("a piece of kit with no title is named by its identity rather than by nothing", () => {
    const [held] = equipmentIn([rowOf({ id: "only-an-id", slug: "db" })])
    expect(held?.title).toBe("only-an-id")
  })
})
