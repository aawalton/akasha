import { expect, test } from "bun:test"
import { refusalIn } from "akasha/agents/hooks/agent-hooks/block-combined-akasha-calls/block-combined-akasha-calls.agent-hook.code.ts"

const NAMES = "block-combined-akasha-calls"

test("a bare read is let through", () => {
  expect(refusalIn("akasha read")).toBe(null)
})

test("a read naming file paths is let through", () => {
  expect(refusalIn("akasha read --file-path a/b.ts --file-path c/d.ts")).toBe(null)
})

test("a read naming a single-quoted path is let through", () => {
  expect(refusalIn("akasha read --file-path 'a/b.ts'")).toBe(null)
})

test("a read naming a quoted path holding a dollar sign is let through", () => {
  expect(refusalIn("akasha read --file-path 'routes/api.pages.$pageTypeSlug.ts'")).toBe(null)
})

test("a read naming a bare path holding a dollar sign is refused", () => {
  expect(refusalIn("akasha read --file-path routes/api.pages.$pageTypeSlug.ts")).toContain(NAMES)
})

test("a quoted path beside a bare path is let through", () => {
  expect(refusalIn("akasha read --file-path 'a/b.ts' --file-path c/d.ts")).toBe(null)
})

test("a quoted run following no path flag is refused", () => {
  expect(refusalIn("akasha read --file-path a/b.ts 'c/d.ts'")).toContain(NAMES)
})

test("a read asking for the whole body is let through", () => {
  expect(refusalIn("akasha read --full --file-path a/b.ts")).toBe(null)
})

test("a read asking for the whole body after the path is let through", () => {
  expect(refusalIn("akasha read --file-path a/b.ts --full")).toBe(null)
})

test("a change command alone is let through", () => {
  expect(refusalIn("akasha change drop")).toBe(null)
})

test("a change command with the word it takes is let through", () => {
  expect(refusalIn("akasha change draft add-file")).toBe(null)
})

test("the namespace named with no command of its own is let through", () => {
  expect(refusalIn("akasha change")).toBe(null)
})

test("a draft whose last line closes its quoted heredoc is let through", () => {
  expect(refusalIn("akasha change draft add-file <<'HEREDOC'\nat: a/b.ts\nHEREDOC")).toBe(null)
})

test("a bare apply is let through", () => {
  expect(refusalIn("akasha change apply")).toBe(null)
})

test("an apply whose last line closes its quoted heredoc is let through", () => {
  expect(refusalIn("akasha change apply <<'HEREDOC'\nmessage: what this is for\nHEREDOC")).toBe(
    null
  )
})

test("an apply carrying a word the form does not take is refused", () => {
  expect(refusalIn("akasha change apply --message x")).toContain(NAMES)
})

test("an apply asking for help is let through", () => {
  expect(refusalIn("akasha change apply --help")).toBe(null)
  expect(refusalIn("akasha change apply -h")).toBe(null)
})

test("a body piped into an apply is refused", () => {
  expect(refusalIn("printf 'message: x' | akasha change apply")).toContain(NAMES)
})

test("an apply opening an unquoted heredoc is refused", () => {
  expect(refusalIn("akasha change apply <<HEREDOC\nmessage: x\nHEREDOC")).toContain(NAMES)
})

test("an apply chained onward is refused", () => {
  expect(refusalIn("akasha change apply && rm -rf x")).toContain(NAMES)
})

test("an akasha command this hook does not name is let through, however it is written", () => {
  expect(refusalIn("akasha git restore --file-path a.ts | head -3")).toBe(null)
})

test("a command naming none of them is let through", () => {
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
  expect(refusalIn("printf 'at: a.ts' | akasha change draft add-file")).toContain(NAMES)
})

test("a change opening an unquoted heredoc is refused", () => {
  expect(refusalIn("akasha change draft add-file <<HEREDOC\nat: a/b.ts\nHEREDOC")).toContain(NAMES)
})

test("a change whose heredoc is not closed by the last line is refused", () => {
  expect(
    refusalIn("akasha change draft add-file <<'HEREDOC'\nat: a/b.ts\nHEREDOC\nrm -rf x")
  ).toContain(NAMES)
})

test("a change carrying more words than the form takes is refused", () => {
  expect(refusalIn("akasha change draft add-file extra")).toContain(NAMES)
})

test("a delimiter closing the body before the last line is refused", () => {
  expect(
    refusalIn("akasha change drop <<'HEREDOC'\nat: x.md\nHEREDOC\necho leaked\nHEREDOC")
  ).toContain(NAMES)
})

test("a delimiter other than the fixed one is refused", () => {
  expect(refusalIn("akasha change draft add-file <<'MYOWN'\nat: a/b.ts\nMYOWN")).toContain(NAMES)
})

test("a change command chained onward is refused", () => {
  expect(refusalIn("akasha change drop && rm -rf x")).toContain(NAMES)
})

test("a read behind a prefix that runs it is refused", () => {
  expect(refusalIn("timeout 900 akasha read --file-path a.ts")).toContain(NAMES)
})

test("a read behind an assignment is let through", () => {
  expect(refusalIn("AKASHA_CPU_PROFILE_DIR=/tmp/prof akasha read --file-path a.ts")).toBe(null)
})

test("an apply behind two assignments is let through", () => {
  expect(refusalIn("A=1 B=2 akasha change apply <<'HEREDOC'\nmessage: x\nHEREDOC")).toBe(null)
})

test("a read behind an assignment holding a quoted value is let through", () => {
  expect(refusalIn("D='one two' akasha read")).toBe(null)
})

test("a read behind an assignment holding a substitution is refused", () => {
  expect(refusalIn("D=$(pwd) akasha read --file-path a.ts")).toContain(NAMES)
})

test("a chain behind an assignment is refused", () => {
  expect(refusalIn("A=1 akasha change drop && rm -rf x")).toContain(NAMES)
})

test("an assignment after the command is refused", () => {
  expect(refusalIn("akasha read A=1")).toContain(NAMES)
})

test("a read carrying a flag it does not take is refused", () => {
  expect(refusalIn("akasha read --bogus a.ts")).toContain(NAMES)
})

test("one of the names inside a quoted run is refused rather than read as data", () => {
  expect(refusalIn('echo "akasha read --file-path a.ts"')).toContain(NAMES)
})

test("another akasha command carrying one of the names in a message is let through", () => {
  expect(refusalIn('akasha sms-send --text "fix the akasha change delimiter"')).toBe(null)
})

test("another akasha command carrying one of the names in single quotes is let through", () => {
  expect(refusalIn("akasha sms-send --text 'akasha change is named here'")).toBe(null)
})

test("a call chained after another akasha command is refused", () => {
  expect(refusalIn('akasha sms-send --text "x" && akasha read y')).toContain(NAMES)
})

test("a run the shell would rewrite is not taken out", () => {
  expect(refusalIn('akasha sms-send --text "see $HOME and akasha read x"')).toContain(NAMES)
})

test("a quoted call handed to another program is refused", () => {
  expect(refusalIn('bash -c "akasha read x | head"')).toContain(NAMES)
})
