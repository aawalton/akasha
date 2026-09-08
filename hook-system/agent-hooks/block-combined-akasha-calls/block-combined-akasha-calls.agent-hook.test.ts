import { expect, test } from "bun:test"
import { refusalIn } from "./block-combined-akasha-calls.agent-hook.code.ts"

const NAMES = "block-combined-akasha-calls"

test("a bare read is let through", () => {
  expect(refusalIn("akasha read")).toBe(null)
})

test("a read naming file paths is let through", () => {
  expect(refusalIn("akasha read --file-path a/b.ts --file-path c/d.ts")).toBe(null)
})

test("an act alone is let through", () => {
  expect(refusalIn("akasha change drop")).toBe(null)
})

test("an act with the word that act takes is let through", () => {
  expect(refusalIn("akasha change take some-agent")).toBe(null)
})

test("a change whose last line closes its quoted heredoc is let through", () => {
  expect(refusalIn("akasha change add-file <<'EOF'\nat: a/b.ts\nEOF")).toBe(null)
})

test("a command naming neither is let through", () => {
  expect(refusalIn("git status")).toBe(null)
})

test("a read behind a working directory change is refused", () => {
  expect(refusalIn("cd x && akasha read --file-path a.ts")).toContain(NAMES)
})

test("a read piped onward is refused", () => {
  expect(refusalIn("akasha read --file-path a.ts | head -3")).toContain(NAMES)
})

test("a read redirected into a file is refused", () => {
  expect(refusalIn("akasha read --file-path a.ts > out.txt")).toContain(NAMES)
})

test("a read inside a for loop is refused", () => {
  expect(refusalIn("for f in a b\ndo akasha read --file-path $f\ndone")).toContain(NAMES)
})

test("a read inside a function body is refused", () => {
  expect(refusalIn("r() { akasha read --file-path $1\n}\nr a.ts")).toContain(NAMES)
})

test("a read inside a substitution is refused", () => {
  expect(refusalIn("echo $(akasha read --file-path a.ts)")).toContain(NAMES)
})

test("a read inside a subshell is refused", () => {
  expect(refusalIn("(akasha read --file-path a.ts)")).toContain(NAMES)
})

test("a body piped into a change is refused", () => {
  expect(refusalIn("printf 'at: a.ts' | akasha change add-file")).toContain(NAMES)
})

test("a change opening an unquoted heredoc is refused", () => {
  expect(refusalIn("akasha change add-file <<EOF\nat: a/b.ts\nEOF")).toContain(NAMES)
})

test("a change whose heredoc is not closed by the last line is refused", () => {
  expect(refusalIn("akasha change add-file <<'EOF'\nat: a/b.ts\nEOF\nrm -rf x")).toContain(NAMES)
})

test("an act chained onward is refused", () => {
  expect(refusalIn("akasha change drop && rm -rf x")).toContain(NAMES)
})

test("a read behind a prefix that runs it is refused", () => {
  expect(refusalIn("timeout 900 akasha read --file-path a.ts")).toContain(NAMES)
})

test("a read carrying a flag it does not take is refused", () => {
  expect(refusalIn("akasha read --bogus a.ts")).toContain(NAMES)
})

test("either name inside a quoted run is refused rather than read as data", () => {
  expect(refusalIn('echo "akasha read --file-path a.ts"')).toContain(NAMES)
})
