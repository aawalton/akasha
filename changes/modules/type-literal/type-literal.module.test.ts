import { expect, test } from "bun:test"
import { aliasIn } from "akasha/changes/modules/type-literal/type-literal.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const AT = "held/one/one.module.code.ts"

function sourced(text: string): ReturnType<typeof parsedAs> {
  return parsedAs(AT, text)
}

test("an alias naming an object type answers that type", () => {
  const held = aliasIn(sourced("type Held = { one: string }\n"), "Held")
  expect(held?.members).toHaveLength(1)
})

test("an alias joining types answers the first object type among them", () => {
  const held = aliasIn(sourced("type Held = Other & { one: string }\n"), "Held")
  expect(held?.members).toHaveLength(1)
})

test("an alias of anything else answers nothing", () => {
  expect(aliasIn(sourced("type Held = string\n"), "Held")).toBeNull()
  expect(aliasIn(sourced("type Held = { one: string } | { two: string }\n"), "Held")).toBeNull()
})

test("a source naming no such alias answers nothing", () => {
  expect(aliasIn(sourced("type Other = { one: string }\n"), "Held")).toBeNull()
})
