import { expect, test } from "bun:test"
import { anothersIn } from "./hook-links.module.code.ts"

const ROOT = "/made-up/checkout"

const HERE = import.meta.path

test("a link naming a file that is there under another checkout is another's", () => {
  expect(anothersIn(HERE, ROOT)).toBe(true)
})

test("a link naming a file that is gone is no one else's", () => {
  expect(anothersIn("/made-up/mounted/one/one.module.code.ts", ROOT)).toBe(false)
})

test("a link naming a file under this checkout is no one else's", () => {
  expect(anothersIn(`${ROOT}/one/one.module.code.ts`, ROOT)).toBe(false)
})

test("no link at all is no one else's", () => {
  expect(anothersIn(null, ROOT)).toBe(false)
})
