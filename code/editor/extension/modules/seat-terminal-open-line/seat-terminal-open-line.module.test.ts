import { expect, test } from "bun:test"
import {
  type AskTmux,
  cursorLineOf,
  lineIn,
  opening,
  paneIn,
} from "akasha/code/editor/extension/modules/seat-terminal-open-line/seat-terminal-open-line.module.code.ts"

const ESCAPE = String.fromCharCode(27)

test("the opening is one bracketed paste of a newline and the prefix", () => {
  expect(opening("  - ")).toBe(`${ESCAPE}[200~\n  - ${ESCAPE}[201~`)
})

test("an empty prefix opens a bracketed paste of a newline alone", () => {
  expect(opening("")).toBe(`${ESCAPE}[200~\n${ESCAPE}[201~`)
})

test("the line is the row past the two columns of the prompt's marker", () => {
  expect(lineIn("❯   - foo\n")).toBe("  - foo")
  expect(lineIn("    3. bar\n")).toBe("  3. bar")
})

test("a row with nothing past the marker is an empty line", () => {
  expect(lineIn("❯ \n")).toBe("")
  expect(lineIn("")).toBe("")
})

test("a pane not in copy mode is read with its cursor row", () => {
  expect(paneIn("%110 54 0\n")).toEqual({ pane: "%110", cursorY: 54 })
})

test("a pane in copy mode answers no pane", () => {
  expect(paneIn("%110 54 1\n")).toBe(null)
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
    "list-panes -t =amy -F #{pane_id} #{cursor_y} #{pane_in_mode}": "%7 12 0\n",
    "capture-pane -p -t %7 -S 12 -E 12": "❯   10) tenth\n",
  })
  expect(await cursorLineOf("amy", ask)).toBe("  10) tenth")
})

test("a seat tmux does not know answers no line", async () => {
  expect(await cursorLineOf("nobody", tmuxSaying({}))).toBe(null)
})

test("a pane in copy mode answers no line", async () => {
  const ask = tmuxSaying({
    "list-panes -t =amy -F #{pane_id} #{cursor_y} #{pane_in_mode}": "%7 12 1\n",
    "capture-pane -p -t %7 -S 12 -E 12": "❯   - foo\n",
  })
  expect(await cursorLineOf("amy", ask)).toBe(null)
})
