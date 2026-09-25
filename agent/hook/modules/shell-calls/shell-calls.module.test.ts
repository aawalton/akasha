import { expect, test } from "bun:test"
import {
  basenameOf,
  calledWords,
  callsIn,
  RUNS_ANOTHER,
  ranBy,
  SPACE_IN_A_WORD,
  segmentsOf,
  wordsOf,
} from "akasha/agent/hook/modules/shell-calls/shell-calls.module.code.ts"

const marked = (words: readonly string[]): string => words.join(SPACE_IN_A_WORD)

test("a line continuation is joined", () => {
  expect(segmentsOf("git \\\nreset --hard")).toEqual(["git reset --hard"])
})

test("a heredoc body is written rather than run, so no call is read out of it", () => {
  expect(segmentsOf("cat > /var/tmp/one <<'EOF'\ncp one akasha/one.ts\nEOF")).toEqual([
    "cat >/var/tmp/one <<EOF",
  ])
})

test("the call opening a heredoc keeps its redirect, so a write on it is still read", () => {
  expect(segmentsOf("cat > akasha/one.ts <<'EOF'\nhello\nEOF")).toEqual([
    "cat >akasha/one.ts <<EOF",
  ])
})

test("a line after a heredoc is read as shell again", () => {
  expect(segmentsOf("cat <<'EOF'\nhello\nEOF\ncp one akasha/one.ts")).toEqual([
    "cat <<EOF",
    "cp one akasha/one.ts",
  ])
})

test("a heredoc body ends only at a line that is its whole delimiter", () => {
  const said = segmentsOf("cat <<'HEREDOC'\nbody HEREDOC-BODY\ncp one two\nHEREDOC-BODY\nHEREDOC")
  expect(said).toEqual(["cat <<HEREDOC"])
})

test("two heredocs on one line each take their own body", () => {
  const said = segmentsOf("cat <<'A' <<'B'\none\nA\ntwo\nB\ncp one akasha/one.ts")
  expect(said).toEqual(["cat <<A <<B", "cp one akasha/one.ts"])
})

test("a substitution in a heredoc opened bare is run, and one opened quoted is not", () => {
  expect(segmentsOf("cat <<EOF\n$(ls one)\nEOF")).toEqual(["cat <<EOF", "ls one"])
  expect(segmentsOf("cat <<'EOF'\n$(ls one)\nEOF")).toEqual(["cat <<EOF"])
})

test("a heredoc handed to a shell is run as a script", () => {
  expect(segmentsOf("bash <<'EOF'\nls one\nEOF")).toEqual(["bash <<EOF", "ls one"])
  expect(segmentsOf("sh <<<'ls one'")).toEqual([`sh <<<${marked(["ls", "one"])}`, "ls one"])
})

test("a herestring opens no body", () => {
  expect(segmentsOf("cat <<<one\ncp one akasha/one.ts")).toEqual([
    "cat <<<one",
    "cp one akasha/one.ts",
  ])
})

test("a quoted run is one word, its spaces kept as a mark rather than cutting it", () => {
  expect(segmentsOf("echo 'ls -la one'")).toEqual([`echo ${marked(["ls", "-la", "one"])}`])
  expect(segmentsOf('cp one "akasha/one two.ts"')).toEqual([
    `cp one ${marked(["akasha/one", "two.ts"])}`,
  ])
})

test("a quoted run holding one bare word is unquoted, so a quoted path stays a path", () => {
  expect(segmentsOf('cat one >"akasha/one.ts"')).toEqual(["cat one >akasha/one.ts"])
  expect(segmentsOf("mv one 'akasha/one.ts'")).toEqual(["mv one akasha/one.ts"])
})

test("a separator inside a quoted run cuts nothing", () => {
  expect(segmentsOf('echo "one|two;three&four"')).toEqual(["echo one|two;three&four"])
})

test("a separator cuts one line into segments", () => {
  expect(segmentsOf("cd one && ls -la")).toEqual(["cd one", "ls -la"])
  for (const between of ["&&", "||", ";", "|", "&", "\n"]) {
    expect(segmentsOf(`echo one ${between} ls two`)).toEqual(["echo one", "ls two"])
  }
})

test("a descriptor duplicated onto another cuts nothing, and the pipe after it cuts", () => {
  expect(segmentsOf("cp one two 2>&1")).toEqual(["cp one two 2>&1"])
  expect(segmentsOf("cp one two >&2")).toEqual(["cp one two >&2"])
  expect(segmentsOf("cp one two 2>&1 | head -3")).toEqual(["cp one two 2>&1", "head -3"])
  expect(segmentsOf("cp one two &>log")).toEqual(["cp one two &>log"])
})

test("a redirect is read after the words of its call, wherever the line puts it", () => {
  expect(segmentsOf(">log echo one")).toEqual(["echo one >log"])
})

test("a redirect on a group is read as a segment of its own", () => {
  expect(segmentsOf("(cd one; ls) > akasha/one.ts")).toEqual(["cd one", "ls", ">akasha/one.ts"])
})

test("leading space on a line is no part of a segment", () => {
  expect(segmentsOf("   ls one")).toEqual(["ls one"])
})

test("a call a command substitution holds is read as a call on the line is", () => {
  expect(segmentsOf("echo $(ls one)")).toEqual([`echo $(${marked(["ls", "one"])})`, "ls one"])
  expect(segmentsOf('echo "$(ls one)"')).toContain("ls one")
  expect(segmentsOf("$(ls one)")).toContain("ls one")
})

test("a call backticks hold is read as a call on the line is", () => {
  expect(segmentsOf("echo `ls one`")).toContain("ls one")
})

test("a call a subshell or a group holds is read as a call on the line is", () => {
  expect(segmentsOf("(ls one)")).toEqual(["ls one"])
  expect(segmentsOf("{ ls one; }")).toEqual(["ls one"])
})

test("a call a process substitution holds is read as a call on the line is", () => {
  expect(segmentsOf("diff <(ls one) two")).toContain("ls one")
})

test("a call an assignment value holds is read as a call on the line is", () => {
  expect(segmentsOf("X=$(ls one)")).toEqual([`X=$(${marked(["ls", "one"])})`, "ls one"])
  expect(segmentsOf("X=$(ls one) echo two")).toContain("ls one")
})

test("a call nested in a substitution inside a substitution is read too", () => {
  expect(segmentsOf("echo $(echo $(ls one))")).toContain("ls one")
  expect(segmentsOf("X=$(echo `ls one`)")).toContain("ls one")
})

test("a call an expansion default holds is read too", () => {
  expect(segmentsOf("echo ${X:-$(ls one)}")).toContain("ls one")
})

test("a call a loop, a condition, a case or a function holds is read too", () => {
  expect(segmentsOf("for f in a; do ls one; done")).toEqual(["ls one"])
  expect(segmentsOf("if true; then ls one; fi")).toEqual(["true", "ls one"])
  expect(segmentsOf("while false; do ls one; done")).toEqual(["false", "ls one"])
  expect(segmentsOf("case a in a) ls one;; esac")).toEqual(["ls one"])
  expect(segmentsOf("f() { ls one; }")).toEqual(["ls one"])
  expect(segmentsOf("[[ $(ls one) ]]")).toEqual(["ls one"])
})

test("a script handed to a shell by its flag is read as calls", () => {
  expect(segmentsOf("bash -c 'ls one'")).toContain("ls one")
  expect(segmentsOf("sh -c tsc")).toContain("tsc")
  expect(segmentsOf("timeout 9 bash -lc 'ls one && ls two'")).toEqual([
    `timeout 9 bash -lc ${marked(["ls", "one", "&&", "ls", "two"])}`,
    "ls one",
    "ls two",
  ])
})

test("a script handed to eval is read as calls", () => {
  expect(segmentsOf("eval 'ls one'")).toContain("ls one")
})

test("a variable the line assigns is read as its value", () => {
  expect(segmentsOf("L=ls; $L one")).toEqual(["L=ls", "ls one"])
  expect(segmentsOf("L='ls one'; $L")).toEqual([`L=${marked(["ls", "one"])}`, "ls one"])
})

test("a variable the line never assigns is read as that variable", () => {
  expect(segmentsOf("$L one")).toEqual(["$L one"])
  expect(segmentsOf("${L} one")).toEqual(["${L} one"])
})

test("every call carries the words and bodies it is handed", () => {
  const [call] = callsIn("python3 <<'EOF'\nopen('akasha/one.ts','w')\nEOF")
  expect(call?.segment).toBe("python3 <<EOF")
  expect(call?.handed).toContain("open('akasha/one.ts','w')")
})

test("a line the parser cannot read whole is read again one line at a time", () => {
  expect(segmentsOf('echo "one\nls two')).toContain("ls two")
  expect(segmentsOf('bash -c "echo \'one\nls two"')).toContain("ls two")
})

test("a line the parser reads whole is read once", () => {
  expect(segmentsOf("echo 'one\nls two'")).toEqual([`echo ${marked(["one", "ls", "two"])}`])
})

test("wordsOf drops the runs of space between words", () => {
  expect(wordsOf("  ls   -la  one ")).toEqual(["ls", "-la", "one"])
})

test("basenameOf takes the last part of a path, and a bare word is its own basename", () => {
  expect(basenameOf("/usr/local/bin/tsc")).toBe("tsc")
  expect(basenameOf("tsc")).toBe("tsc")
})

test("ranBy names the first word that is no flag", () => {
  expect(ranBy(["-x", "/usr/bin/tsc", "one"])).toBe("tsc")
  expect(ranBy(["-x"])).toBeNull()
})

test("a segment carrying no prefix is its own words", () => {
  expect(calledWords("tsc --noEmit")).toEqual(["tsc", "--noEmit"])
  expect(calledWords("")).toEqual([])
})

test("a prefix that only runs what follows it is stepped over", () => {
  for (const one of RUNS_ANOTHER) {
    expect(calledWords(`${one} tsc --noEmit`)).toEqual(["tsc", "--noEmit"])
  }
})

test("a prefix reached by a path is the same prefix", () => {
  expect(calledWords("/usr/bin/timeout 900 tsc")).toEqual(["tsc"])
})

test("the flags of a prefix are stepped over with it", () => {
  expect(calledWords("stdbuf -oL tsc")).toEqual(["tsc"])
  expect(calledWords("timeout --preserve-status 900 tsc")).toEqual(["tsc"])
  expect(calledWords("nohup --version tsc")).toEqual(["tsc"])
})

test("a prefix flag taking a value takes the word after it", () => {
  expect(calledWords("timeout -k 5 900 tsc")).toEqual(["tsc"])
  expect(calledWords("timeout --signal TERM 900 tsc")).toEqual(["tsc"])
  expect(calledWords("nice -n 10 tsc")).toEqual(["tsc"])
  expect(calledWords("env -u HOME tsc")).toEqual(["tsc"])
  expect(calledWords("stdbuf -o L tsc")).toEqual(["tsc"])
})

test("the number a prefix takes is stepped over and nothing else is", () => {
  expect(calledWords("timeout 900 tsc")).toEqual(["tsc"])
  expect(calledWords("timeout 1.5h tsc")).toEqual(["tsc"])
  expect(calledWords("taskset 0x3 tsc")).toEqual(["tsc"])
  expect(calledWords("chrt 99 tsc")).toEqual(["tsc"])
  expect(calledWords("timeout 900 echo tsc")).toEqual(["echo", "tsc"])
})

test("a prefix takes one number of its own rather than every number", () => {
  expect(calledWords("timeout 900 7 tsc")).toEqual(["7", "tsc"])
})

test("a prefix flag that asks rather than runs leaves no call", () => {
  expect(calledWords("command -v tsc")).toEqual([])
  expect(calledWords("sudo -l tsc")).toEqual([])
  expect(calledWords("sudo -v")).toEqual([])
})

test("a prefix carrying nothing behind it leaves no call", () => {
  expect(calledWords("timeout")).toEqual([])
  expect(calledWords("env")).toEqual([])
  expect(calledWords("timeout --help")).toEqual([])
})

test("a prefix behind a prefix is stepped over too", () => {
  expect(calledWords("timeout 900 sudo nice -n 10 tsc --noEmit")).toEqual(["tsc", "--noEmit"])
  expect(calledWords("nohup nice tsc")).toEqual(["tsc"])
})

test("a variable assignment before a call is stepped over, behind a prefix as well", () => {
  expect(calledWords("TS_NODE=one tsc")).toEqual(["tsc"])
  expect(calledWords("env NODE_ENV=one tsc")).toEqual(["tsc"])
  expect(calledWords("timeout 900 NODE_ENV=one tsc")).toEqual(["tsc"])
})

test("a word this names no prefix is the call, whatever follows it", () => {
  expect(calledWords("echo tsc")).toEqual(["echo", "tsc"])
  expect(calledWords("xargs tsc")).toEqual(["xargs", "tsc"])
  expect(calledWords("make typecheck")).toEqual(["make", "typecheck"])
})
