import { expect, test } from "bun:test"
import {
  type AskTmux,
  cursorLineOf,
  lineIn,
  opening,
  paneIn,
  sentOn,
} from "akasha/code/editor/extension/modules/seat-terminal-open-line/seat-terminal-open-line.module.code.ts"

const ESCAPE = String.fromCharCode(27)

const ERASE = String.fromCharCode(127)

test("the opening is escape and return, then the prefix", () => {
  expect(opening("  - ")).toBe(`${ESCAPE}\r  - `)
})

test("an empty prefix opens escape and return alone", () => {
  expect(opening("")).toBe(`${ESCAPE}\r`)
})

test("an item carrying words opens a line under it", () => {
  expect(sentOn("2. B", 4)).toBe(`${ESCAPE}\r3. `)
  expect(sentOn("foo", 3)).toBe(`${ESCAPE}\r`)
  expect(sentOn("", 0)).toBe(`${ESCAPE}\r`)
})

test("an item holding only its marker erases that marker rather than opening a line", () => {
  expect(sentOn("3.", 3)).toBe(ERASE.repeat(3))
  expect(sentOn("-", 2)).toBe(ERASE.repeat(2))
})

test("the erasure leaves the indent the item sat at", () => {
  expect(sentOn("  10)", 6)).toBe(ERASE.repeat(4))
})

test("an item whose marker the cursor sits before opens a line", () => {
  expect(sentOn("  3.", 2)).toBe(`${ESCAPE}\r  `)
})

test("the line is the row past the two columns of the prompt's marker", () => {
  expect(lineIn("❯   - foo\n")).toBe("  - foo")
  expect(lineIn("    3. bar\n")).toBe("  3. bar")
})

test("a row with nothing past the marker is an empty line", () => {
  expect(lineIn("❯ \n")).toBe("")
  expect(lineIn("")).toBe("")
})

test("a pane not in copy mode is read with its cursor row and column", () => {
  expect(paneIn("%110 54 9 0\n")).toEqual({ pane: "%110", cursorY: 54, cursorX: 9 })
})

test("a pane in copy mode answers no pane", () => {
  expect(paneIn("%110 54 9 1\n")).toBe(null)
})

test("an answer that is no pane line answers no pane", () => {
  expect(paneIn("")).toBe(null)
  expect(paneIn("can't find session: nobody\n")).toBe(null)
})

function tmuxSaying(byArgv: Readonly<Record<string, string | null>>): AskTmux {
  return async (argv) => byArgv[argv.join(" ")] ?? null
}

test("the cursor line is read off the pane the seat's session holds", async () => {
  const ask = tmuxSaying({
    "list-panes -t =amy -F #{pane_id} #{cursor_y} #{cursor_x} #{pane_in_mode}": "%7 12 13 0\n",
    "capture-pane -p -t %7 -S 12 -E 12": "❯   10) tenth\n",
  })
  expect(await cursorLineOf("amy", ask)).toEqual({ line: "  10) tenth", column: 11 })
})

test("a seat tmux does not know answers no line", async () => {
  expect(await cursorLineOf("nobody", tmuxSaying({}))).toBe(null)
})

test("a pane in copy mode answers no line", async () => {
  const ask = tmuxSaying({
    "list-panes -t =amy -F #{pane_id} #{cursor_y} #{cursor_x} #{pane_in_mode}": "%7 12 13 1\n",
    "capture-pane -p -t %7 -S 12 -E 12": "❯   - foo\n",
  })
  expect(await cursorLineOf("amy", ask)).toBe(null)
})
