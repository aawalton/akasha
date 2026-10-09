import { expect, test } from "bun:test"
import { rejoined } from "akasha/command/pages/story/modules/beat-rejoining/beat-rejoining.module.code.ts"

test("each beat's prose is joined as written, with nothing trimmed", () => {
  const written = [
    JSON.stringify({ beat: 1, event: "One.", prose: "One.\n \n" }),
    JSON.stringify({ beat: 2, event: "Two.", prose: "Two.\n" }),
  ].join("\n")
  expect(rejoined(`${written}\n`)).toBe("One.\n \nTwo.\n")
})

test("a beat stating no prose adds nothing", () => {
  const written = [
    JSON.stringify({ beat: 1, event: "One." }),
    JSON.stringify({ beat: 2, event: "Two.", prose: "Two." }),
  ].join("\n")
  expect(rejoined(written)).toBe("Two.")
})
