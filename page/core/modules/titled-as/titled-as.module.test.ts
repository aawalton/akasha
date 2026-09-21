import { expect, test } from "bun:test"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"

test("a dash and an underscore each part one word from the next", () => {
  expect(titledAs("to-do-due-date")).toBe("To Do Due Date")
  expect(titledAs("next_character")).toBe("Next Character")
})

test("each word is answered with its first letter raised and the rest as written", () => {
  expect(titledAs("title")).toBe("Title")
  expect(titledAs("p1")).toBe("P1")
  expect(titledAs("eso-API")).toBe("Eso API")
})

test("text a slash qualifies is answered as what follows the last slash", () => {
  expect(titledAs("bird-kind/great-crested-grebe")).toBe("Great Crested Grebe")
  expect(titledAs("one/two/three_four")).toBe("Three Four")
})

test("empty text is answered as empty text", () => {
  expect(titledAs("")).toBe("")
})
