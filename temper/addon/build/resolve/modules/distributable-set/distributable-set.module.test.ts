import { expect, test } from "bun:test"
import {
  type AddonDependencies,
  dependencyName,
  resolveDistributableSet,
} from "akasha/temper/addon/build/resolve/modules/distributable-set/distributable-set.module.code.ts"

function setOf(entries: Readonly<Record<string, AddonDependencies>>) {
  return new Map(Object.entries(entries))
}

test("an addon named in the set being released is carried", () => {
  const held = resolveDistributableSet(setOf({ B: { dependsOn: [] }, A: { dependsOn: [] } }))
  expect(held.included).toEqual(["A", "B"])
  expect(held.external).toEqual([])
})

test("a dependency on an addon outside the set is left to the player", () => {
  const held = resolveDistributableSet(
    setOf({ A: { dependsOn: ["B", "LibZone"] }, B: { dependsOn: [] } })
  )
  expect(held.external).toEqual(["LibZone"])
})

test("an optional dependency counts the same as a required one", () => {
  const held = resolveDistributableSet(
    setOf({ A: { dependsOn: [], optionalDependsOn: ["LibHistoire"] } })
  )
  expect(held.external).toEqual(["LibHistoire"])
})

test("a version floor written after the name is cut off", () => {
  expect(dependencyName("LibHistoire>=71")).toBe("LibHistoire")
  expect(dependencyName("LibHistoire")).toBe("LibHistoire")
  const held = resolveDistributableSet(setOf({ A: { dependsOn: ["LibHistoire>=71"] } }))
  expect(held.external).toEqual(["LibHistoire"])
})

test("an empty dependency name is no dependency", () => {
  expect(resolveDistributableSet(setOf({ A: { dependsOn: [">=1"] } })).external).toEqual([])
})
