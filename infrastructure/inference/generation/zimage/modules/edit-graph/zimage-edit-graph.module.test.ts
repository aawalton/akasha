import { expect, test } from "bun:test"
import { buildEditGraph } from "akasha/infrastructure/inference/generation/zimage/modules/edit-graph/zimage-edit-graph.module.code.ts"

test("an edit with no reference hands the encoders the edited image alone", () => {
  const graph = buildEditGraph("place.png", "two girls at a table", 7)
  expect(graph["9"]?.inputs).not.toHaveProperty("image2")
  expect(graph["41"]).toBeUndefined()
  expect(graph["13"]?.inputs["pixels"]).toEqual(["8", 0])
})

test("two references are loaded and handed to both encoders as image2 and image3", () => {
  const graph = buildEditGraph("place.png", "two girls at a table", 7, ["elsie.png", "cora.png"])
  expect(graph["41"]).toEqual({ class_type: "LoadImage", inputs: { image: "elsie.png" } })
  expect(graph["42"]).toEqual({ class_type: "LoadImage", inputs: { image: "cora.png" } })
  for (const encoder of ["9", "10"]) {
    expect(graph[encoder]?.inputs["image1"]).toEqual(["8", 0])
    expect(graph[encoder]?.inputs["image2"]).toEqual(["41", 0])
    expect(graph[encoder]?.inputs["image3"]).toEqual(["42", 0])
  }
  expect(graph["9"]?.inputs["prompt"]).toBe("two girls at a table")
})

test("one reference fills image2 and leaves image3 empty", () => {
  const graph = buildEditGraph("place.png", "a girl", 7, ["elsie.png"])
  expect(graph["9"]?.inputs["image2"]).toEqual(["41", 0])
  expect(graph["9"]?.inputs).not.toHaveProperty("image3")
})

test("a third reference is refused", () => {
  expect(() => buildEditGraph("place.png", "x", 7, ["a.png", "b.png", "c.png"])).toThrow(
    "at most 2 references"
  )
})
