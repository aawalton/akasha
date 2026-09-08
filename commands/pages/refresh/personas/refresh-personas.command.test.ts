import { expect, test } from "bun:test"
import { saidOf } from "./refresh-personas.command.code.ts"

test("one persona rebuilt is said in the singular", () => {
  expect(saidOf(1)).toBe("1 persona was rebuilt from the days before today")
})

test("more than one persona rebuilt is said in the plural", () => {
  expect(saidOf(4)).toBe("4 personas were rebuilt from the days before today")
})
