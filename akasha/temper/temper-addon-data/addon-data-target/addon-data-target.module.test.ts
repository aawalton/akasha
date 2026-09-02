import { expect, test } from "bun:test"
import {
  ADDON_DATA_TARGETS,
  type AddonDataTarget,
  partDigitsOf,
  partSlugsOf,
  targetOf,
} from "./addon-data-target.module.code.ts"

const ONE: AddonDataTarget = {
  rendered: "a-table.generated.ts",
  workspacePackage: "a-package",
  moduleSlug: "a-module",
  partPrefix: "a-part",
  parts: 1,
}

function withParts(parts: number): AddonDataTarget {
  return { ...ONE, parts }
}

function found(rendered: string): AddonDataTarget {
  const one = targetOf(rendered)
  if (one === undefined) throw new Error(`no row names ${rendered}`)
  return one
}

test("a single-part target is named by its module slug alone", () => {
  expect(partSlugsOf(withParts(1))).toEqual(["a-module"])
})

test("a part slug is written with no fewer than two digits", () => {
  expect(partDigitsOf(2)).toBe(2)
  expect(partDigitsOf(4)).toBe(2)
  expect(partDigitsOf(100)).toBe(2)
  expect(partSlugsOf(withParts(2))).toEqual(["a-part-00", "a-part-01"])
})

test("a part slug is written with as many digits as the highest index needs", () => {
  expect(partDigitsOf(101)).toBe(3)
  expect(partDigitsOf(124)).toBe(3)
  expect(partDigitsOf(1001)).toBe(4)
  const held = partSlugsOf(withParts(124))
  expect(held).toHaveLength(124)
  expect(held[0]).toBe("a-part-000")
  expect(held[99]).toBe("a-part-099")
  expect(held[123]).toBe("a-part-123")
})

test("every part of a series is named once", () => {
  for (const parts of [2, 4, 5, 85, 124]) {
    expect(new Set(partSlugsOf(withParts(parts))).size).toBe(parts)
  }
})

test("the gear set table is named as it is landed", () => {
  const one = found("temper-set.generated.ts")
  expect(one.moduleSlug).toBe("sets-all")
  expect(one.partPrefix).toBe("sets-data")
  expect(one.parts).toBe(124)
  const held = partSlugsOf(one)
  expect(held[0]).toBe("sets-data-000")
  expect(held[123]).toBe("sets-data-123")
})

test("the character skill table keeps two digits at eighty-five parts", () => {
  const one = found("temper-skill.generated.ts")
  expect(one.parts).toBe(85)
  const held = partSlugsOf(one)
  expect(held[0]).toBe("character-skills-00")
  expect(held[84]).toBe("character-skills-84")
})

test("no two rows name the same rendered table", () => {
  const named = ADDON_DATA_TARGETS.map((one) => one.rendered)
  expect(new Set(named).size).toBe(named.length)
})

test("a rendered table no row names is not found", () => {
  expect(targetOf("no-such-table.generated.ts")).toBeUndefined()
})
