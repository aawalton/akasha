import { expect, test } from "bun:test"
import {
  type AskTmux,
  cursorLineIn,
  cursorLineOf,
  lineIn,
  opening,
  paneIn,
  sentOn,
  wrapsOnto,
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

const WIDTH = 80

const INTRO = "❯ intro line"

const BULLET = "  - a bullet item whose words run on far past the width of the pane so that it"

const NUMBERED = "  3. a numbered item whose words also run on far past the width of the pane so"

const NESTED = "    - a nested item whose words also run on far past the width of the pane so"

function sentAt(rows: readonly string[], cursorX: number): string {
  const at = cursorLineIn(rows, cursorX, WIDTH)
  return sentOn(at.line, at.column)
}

test("a line the prompt did not wrap is read off the cursor's row alone", () => {
  expect(cursorLineIn([INTRO, "  - short item"], 14, WIDTH)).toEqual({
    line: "- short item",
    column: 12,
  })
  expect(sentAt([INTRO, "  - short item"], 14)).toBe(`${ESCAPE}\r- `)
})

test("a wrapped bullet item opens a line carrying its bullet", () => {
  expect(sentAt([INTRO, BULLET, "  has to wrap onto another row"], 30)).toBe(`${ESCAPE}\r- `)
})

test("a wrapped numbered item opens a line carrying the next number", () => {
  const rows = [INTRO, BULLET, "  has to wrap onto another row", NUMBERED, "  it wraps twice"]
  expect(sentAt(rows, 17)).toBe(`${ESCAPE}\r4. `)
})

test("a nested item wrapped over three rows opens a line at its indent", () => {
  const rows = [
    INTRO,
    NESTED,
    "  the pane so that it wraps and wraps and wraps and wraps and wraps and wraps",
    "  again",
  ]
  expect(sentAt(rows, 7)).toBe(`${ESCAPE}\r  - `)
})

test("a line ended by hand under a wrapped item carries nothing of that item", () => {
  expect(sentAt([INTRO, NESTED, "  that it wraps", "  plain"], 7)).toBe(`${ESCAPE}\r`)
})

test("the column on a wrapped row counts every row the line holds before it", () => {
  const at = cursorLineIn([INTRO, BULLET, "  has to wrap"], 5, WIDTH)
  expect(at.column).toBe(BULLET.length - 2 + 1 + 3)
})

test("an item holding only its marker still erases that marker under a full row", () => {
  expect(sentAt([INTRO, BULLET, "  3."], 5)).toBe(ERASE.repeat(3))
  expect(sentAt([INTRO, "  1. one", "    -"], 6)).toBe(ERASE.repeat(2))
})

test("the prompt's marker row starts the line", () => {
  expect(wrapsOnto(BULLET, "❯ has to wrap", WIDTH)).toBe(false)
})

test("a row opening with a space starts a line rather than wrapping", () => {
  expect(wrapsOnto(BULLET, "    has to wrap", WIDTH)).toBe(false)
})

test("a row under something other than the prompt starts the line", () => {
  expect(wrapsOnto("─".repeat(WIDTH), "  has to wrap", WIDTH)).toBe(false)
})

test("a row is wrapped where its first word would reach past four columns short of the width", () => {
  expect(wrapsOnto(`  ${"a".repeat(69)}`, "  bbbb", WIDTH)).toBe(false)
  expect(wrapsOnto(`  ${"a".repeat(69)}`, "  bbbbb", WIDTH)).toBe(true)
})

test("a pane not in copy mode is read with its cursor row and column and its width", () => {
  expect(paneIn("%110 54 9 128 0\n")).toEqual({ pane: "%110", cursorY: 54, cursorX: 9, width: 128 })
})

test("a pane in copy mode answers no pane", () => {
  expect(paneIn("%110 54 9 128 1\n")).toBe(null)
})

test("an answer that is no pane line answers no pane", () => {
  expect(paneIn("")).toBe(null)
  expect(paneIn("can't find session: nobody\n")).toBe(null)
})

function tmuxSaying(byArgv: Readonly<Record<string, string | null>>): AskTmux {
  return async (argv) => byArgv[argv.join(" ")] ?? null
}

const PANES =
  "list-panes -t =amy -F #{pane_id} #{cursor_y} #{cursor_x} #{pane_width} #{pane_in_mode}"

test("the cursor line reaches up the rows the prompt wrapped it onto", async () => {
  const ask = tmuxSaying({
    [PANES]: "%7 3 15 80 0\n",
    "capture-pane -p -t %7 -S 0 -E 3": `${"─".repeat(WIDTH)}\n${INTRO}\n${BULLET}\n  has to wrap\n`,
  })
  expect(await cursorLineOf("amy", ask)).toEqual({
    line: `${BULLET.slice(2)} has to wrap`,
    column: BULLET.length - 2 + 1 + 13,
  })
})

test("the cursor line is read off the pane the seat's session holds", async () => {
  const ask = tmuxSaying({
    [PANES]: "%7 12 13 80 0\n",
    "capture-pane -p -t %7 -S 0 -E 12": "❯   10) tenth\n",
  })
  expect(await cursorLineOf("amy", ask)).toEqual({ line: "  10) tenth", column: 11 })
})

test("a seat tmux does not know answers no line", async () => {
  expect(await cursorLineOf("nobody", tmuxSaying({}))).toBe(null)
})

test("a pane in copy mode answers no line", async () => {
  const ask = tmuxSaying({
    [PANES]: "%7 12 13 80 1\n",
    "capture-pane -p -t %7 -S 0 -E 12": "❯   - foo\n",
  })
  expect(await cursorLineOf("amy", ask)).toBe(null)
})
