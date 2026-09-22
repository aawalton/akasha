import { expect, test } from "bun:test"
import {
  CEILING,
  MARKUP_CEILING,
  PROSE_CEILING,
  WHOLE_PROSE_CEILING,
} from "akasha/check/code/pages/file-length/modules/length-ceiling/length-ceiling.module.code.ts"

test("a code file is held to fifteen thousand bytes", () => {
  expect(CEILING).toBe(15000)
})

test("a markup file is held to a hundred and twenty-eight kibibytes", () => {
  expect(MARKUP_CEILING).toBe(128 * 1024)
})

test("a prose file is held to a hundred and twenty-eight kibibytes", () => {
  expect(PROSE_CEILING).toBe(128 * 1024)
})

test("the whole prose of a page is held to five hundred and twelve kibibytes", () => {
  expect(WHOLE_PROSE_CEILING).toBe(512 * 1024)
})
