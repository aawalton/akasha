import { expect, test } from "bun:test"
import { facesFrom } from "akasha/story/game/game-mechanic/modules/dice-rolling/dice-rolling.module.code.ts"

const MANY = 6000
const LEAST = 850

function facesOf(seed: string, said: string): readonly number[] {
  const shown = facesFrom(seed, said)
  if ("refused" in shown) throw new Error(shown.refused)
  return shown.answered.faces
}

test("one seed shows one set of faces, every time that seed is asked", () => {
  expect(facesFrom("the-tower/1", "2d10")).toEqual({
    answered: { said: "2d10", sides: 10, faces: [5, 7] },
  })
  expect(facesOf("a-seed", "3d6")).toEqual([1, 5, 2])
})

test("another seed shows another set of faces", () => {
  expect(facesOf("the-tower/2", "2d10")).not.toEqual(facesOf("the-tower/1", "2d10"))
})

test("a handful holds as many faces as it says, each a face that die has", () => {
  const faces = facesOf("a-seed", "5d20")
  expect(faces).toHaveLength(5)
  for (const face of faces) {
    expect(face).toBeGreaterThanOrEqual(1)
    expect(face).toBeLessThanOrEqual(20)
  }
})

test("no face is likelier than another", () => {
  const seen = new Map<number, number>()
  for (let at = 0; at < MANY; at += 1) {
    const face = facesOf(`a-seed/${at}`, "1d6")[0] ?? 0
    seen.set(face, (seen.get(face) ?? 0) + 1)
  }
  expect([...seen.keys()].sort()).toEqual([1, 2, 3, 4, 5, 6])
  for (const count of seen.values()) expect(count).toBeGreaterThan(LEAST)
})

test("what is no handful of dice is refused", () => {
  for (const said of ["d20", "2d", "2D10", "0d6", "2d1", "two d ten", ""]) {
    expect(facesFrom("a-seed", said)).toHaveProperty("refused")
  }
})

test("a handful larger than a game rolls is refused", () => {
  expect(facesFrom("a-seed", "101d6")).toHaveProperty("refused")
  expect(facesFrom("a-seed", "1d1001")).toHaveProperty("refused")
})
