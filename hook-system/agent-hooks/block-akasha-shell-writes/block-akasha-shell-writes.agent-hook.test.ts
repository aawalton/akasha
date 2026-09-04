import { expect, test } from "bun:test"
import { rootOf } from "@akasha/command-system/rooting"
import { indexNamed } from "@akasha/indexes"
import {
  editsInPlace,
  landingsIn,
  pathsSpelledIn,
  programHandedIn,
  programsIn,
  rawCallsIn,
  redirectsIn,
  refusalFor,
} from "./block-akasha-shell-writes.agent-hook.code.ts"

const ROOT = rootOf(import.meta.path)

const INSIDE = "inside the akasha folder"

const REBUILD = "akasha index refresh"

function said(command: string): string | null {
  return refusalFor(command, ROOT, ROOT)
}

test("a copy landing inside akasha is refused", () => {
  expect(said("cp /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
})

test("a move landing inside akasha is refused", () => {
  expect(said("mv /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
})

test("a redirect landing inside akasha is refused", () => {
  expect(said("echo hi > akasha/held.domain.ts")).toContain(INSIDE)
})

test("a redirect written against its target is refused", () => {
  expect(said("echo hi >akasha/held.domain.ts")).toContain(INSIDE)
})

test("an appending redirect is refused as a truncating one is", () => {
  expect(said("echo hi >> akasha/held.domain.ts")).toContain(INSIDE)
})

test("a redirect onto the index is refused, and names the one repair", () => {
  expect(said(`echo hi > ${indexNamed()}/held.jsonl`)).toContain(REBUILD)
})

test("a copy out of akasha stands, because it lands outside", () => {
  expect(said("cp akasha/held.domain.ts /var/tmp/x")).toBeNull()
})

test("a copy into a target directory named by a flag is refused", () => {
  expect(said("cp -t akasha /var/tmp/x")).toContain(INSIDE)
})

test("a write outside the guarded roots stands", () => {
  expect(said("cp /var/tmp/a /var/tmp/b")).toBeNull()
  expect(said("echo hi > /var/tmp/b")).toBeNull()
})

test("a later segment is judged as the first is", () => {
  expect(said("echo hi && cp /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
})

test("a path inside a quoted payload is no call", () => {
  expect(said("echo 'cp /var/tmp/x akasha/held.domain.ts'")).toBeNull()
})

test("a descriptor redirected onto another is no path", () => {
  expect(redirectsIn(["foo", "2>&1"])).toEqual([])
})

test("a copy naming one operand names no target", () => {
  expect(landingsIn("cp akasha/held.domain.ts")).toEqual([])
})

test("a tool reached by a path is that tool", () => {
  expect(said("/usr/bin/cp /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
})

test("an in-place perl edit landing inside akasha is refused", () => {
  expect(said("perl -pi -e 's/a/b/' akasha/held.domain.ts")).toContain(INSIDE)
})

test("an in-place sed edit landing inside akasha is refused", () => {
  expect(said("sed -i 's/a/b/' akasha/held.domain.ts")).toContain(INSIDE)
})

test("an in-place edit spelled in full is refused as the short flag is", () => {
  expect(said("sed --in-place 's/a/b/' akasha/held.domain.ts")).toContain(INSIDE)
})

test("an in-place flag carrying a suffix is refused", () => {
  expect(said("sed -i.bak 's/a/b/' akasha/held.domain.ts")).toContain(INSIDE)
})

test("an in-place edit onto the index is refused, and names the one repair", () => {
  expect(said(`perl -pi -e 's/a/b/' ${indexNamed()}/held.jsonl`)).toContain(REBUILD)
})

test("a sed reading akasha without writing it stands", () => {
  expect(said("sed 's/a/b/' akasha/held.domain.ts")).toBeNull()
})

test("an awk reading akasha without writing it stands", () => {
  expect(said("awk '{print}' akasha/held.domain.ts")).toBeNull()
})

test("an in-place edit outside the guarded roots stands", () => {
  expect(said("perl -pi /var/tmp/edit.pl /var/tmp/x")).toBeNull()
})

test("a redirect is no operand of the call it is written beside", () => {
  expect(said("rm -f /var/tmp/x 2>/dev/null")).toBeNull()
  expect(said("rm -f /var/tmp/x 2> /var/tmp/err")).toBeNull()
  expect(said("mkdir -p /var/tmp/held 2>/dev/null")).toBeNull()
  expect(said("touch /var/tmp/x 2>&1")).toBeNull()
  expect(said("cp /var/tmp/a /var/tmp/b 2>/dev/null")).toBeNull()
  expect(said("tee /var/tmp/a 2>/dev/null")).toBeNull()
})

test("a redirect in a heredoc body is no landing either", () => {
  expect(said("cat > /var/tmp/x.sh <<'SH'\nrm -f /var/tmp/y 2>/dev/null\nSH")).toBeNull()
})

test("a write inside akasha is refused past a redirect written beside it", () => {
  expect(said("echo hi > akasha/held.domain.ts 2>/dev/null")).toContain(INSIDE)
  expect(said("echo hi >> akasha/held.domain.ts 2>&1")).toContain(INSIDE)
  expect(said("tee akasha/held.domain.ts 2>/dev/null")).toContain(INSIDE)
  expect(said("sed -i 's/a/b/' akasha/held.domain.ts 2>/dev/null")).toContain(INSIDE)
  expect(said("cp /var/tmp/x akasha/held.domain.ts 2>/dev/null")).toContain(INSIDE)
  expect(said("mv /var/tmp/x akasha/held.domain.ts 2>&1")).toContain(INSIDE)
  expect(said("rm -f akasha/held.domain.ts 2>/dev/null")).toContain(INSIDE)
  expect(said("cat > akasha/held.domain.ts <<'EOF'\nhi\nEOF")).toContain(INSIDE)
})

test("a redirect at the end no longer hides the target of a copy", () => {
  expect(landingsIn("cp /var/tmp/x akasha/held.domain.ts 2>/dev/null")).toEqual([
    { at: "akasha/held.domain.ts", how: "cp" },
    { at: "/dev/null", how: "a redirect" },
  ])
})

test("a tee landing inside akasha is refused", () => {
  expect(said("tee akasha/held.domain.ts")).toContain(INSIDE)
})

test("a dd naming its out file inside akasha is refused", () => {
  expect(said("dd if=/var/tmp/x of=akasha/held.domain.ts")).toContain(INSIDE)
})

test("an in-place edit names the tool it was refused for", () => {
  expect(said("perl -pi -e 's/a/b/' akasha/held.domain.ts")).toContain("`perl` lands on")
})

test("an upper-case flag carrying an i is no in-place flag", () => {
  expect(editsInPlace(["perl", "-Ilib", "-e", "print"])).toBe(false)
})

test("an install landing inside akasha is refused", () => {
  expect(said("install -m 644 /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
})

test("a link made inside akasha is refused", () => {
  expect(said("ln -s /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
})

test("a truncate of a file inside akasha is refused", () => {
  expect(said("truncate -s 0 akasha/held.domain.ts")).toContain(INSIDE)
})

test("a touch inside akasha is refused", () => {
  expect(said("touch akasha/held.domain.ts")).toContain(INSIDE)
})

test("a removal inside akasha is refused", () => {
  expect(said("rm -f akasha/held.domain.ts")).toContain(INSIDE)
})

test("a directory made inside akasha is refused", () => {
  expect(said("mkdir -p akasha/held")).toContain(INSIDE)
})

test("a refusal names the removing command as well as the writing one", () => {
  expect(said("rm -f akasha/held.domain.ts")).toContain("akasha remove --file-path")
})

test("a write outside the guarded roots stands for the verbs added here", () => {
  expect(said("rm -f /var/tmp/x")).toBeNull()
  expect(said("touch /var/tmp/x")).toBeNull()
  expect(said("mkdir -p /var/tmp/held")).toBeNull()
  expect(said("ln -s /var/tmp/x /var/tmp/y")).toBeNull()
})

test("a prefix that only runs the call behind it does not hide the call", () => {
  expect(said("sudo cp /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
  expect(said("env cp /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
  expect(said("timeout 5 cp /var/tmp/x akasha/held.domain.ts")).toContain(INSIDE)
  expect(said("nohup tee akasha/held.domain.ts")).toContain(INSIDE)
})

test("a name set before a prefixed call is not the call", () => {
  expect(said("VAR=1 sudo sed -i 's/a/b/' akasha/held.domain.ts")).toContain(INSIDE)
})

test("a prefix flag that asks rather than runs leaves no call", () => {
  expect(said("command -v cp")).toBeNull()
})

test("a program run over a path inside akasha is refused", () => {
  expect(said("python3 <<'EOF'\nopen('akasha/held.domain.ts','w').write('x')\nEOF")).toContain(
    INSIDE
  )
})

test("a program handed in on the command line is refused as a heredoc is", () => {
  expect(said("python3 -c \"open('akasha/held.domain.ts','w').write('x')\"")).toContain(INSIDE)
})

test("a program carrying spaces is refused, the raw line being read for the path", () => {
  expect(said("python3 -c \"import os; os.remove('akasha/held.domain.ts')\"")).toContain(INSIDE)
})

test("every named interpreter is judged the same way", () => {
  expect(said("node -e \"require('fs').writeFileSync('akasha/held.domain.ts','x')\"")).toContain(
    INSIDE
  )
  expect(said("bun run - <<'EOF'\nawait Bun.write('akasha/held.domain.ts','x')\nEOF")).toContain(
    INSIDE
  )
  expect(said("deno eval \"Deno.writeTextFileSync('akasha/held.domain.ts','x')\"")).toContain(
    INSIDE
  )
  expect(said("ruby -e \"File.write('akasha/held.domain.ts','x')\"")).toContain(INSIDE)
  expect(said("php -r \"file_put_contents('akasha/held.domain.ts','x');\"")).toContain(INSIDE)
})

test("a program is refused for naming the path rather than for what it does with it", () => {
  expect(said("perl -e 'print' akasha/held.domain.ts")).toContain(INSIDE)
  expect(said("python3 /var/tmp/w.py akasha/held.domain.ts")).toContain(INSIDE)
})

test("a refusal over a program says the program's text is not read", () => {
  expect(said("python3 -c \"open('akasha/held.domain.ts','w')\"")).toContain(
    "A program's own text is not read here"
  )
})

test("a program naming the index is refused, and names the one repair", () => {
  expect(said(`python3 -c "open('${indexNamed()}/held.jsonl','w')"`)).toContain(REBUILD)
})

test("a program naming no guarded path stands", () => {
  expect(said('python3 -c "print(1)"')).toBeNull()
  expect(said("bun run /var/tmp/probe.tmp.ts")).toBeNull()
  expect(said("node /var/tmp/w.js /var/tmp/x")).toBeNull()
})

test("a word carrying no separator is no path", () => {
  expect(pathsSpelledIn("python3 -c print(1)")).toEqual([])
})

test("a path is taken out of a word the rest of which is program text", () => {
  expect(pathsSpelledIn("open(akasha/held.domain.ts,w).write(x)")).toEqual([
    "akasha/held.domain.ts",
  ])
})

test("an interpreter is read from the call rather than from a quoted run", () => {
  expect(programsIn("python3 -c print(1)")).toEqual(["python3"])
  expect(programsIn("echo 'run python3 over akasha'")).toEqual([])
})

test("an interpreter behind a prefix is the call", () => {
  expect(programsIn("sudo python3 -c print(1)")).toEqual(["python3"])
})

test("a path another call in the chain names is not the program's", () => {
  expect(said("bun run /var/tmp/x.tmp.ts; akasha test --file-path akasha/hook-system")).toBeNull()
  expect(said("bun run /var/tmp/x.tmp.ts && rg slug akasha/hook-system")).toBeNull()
  expect(said("python3 /var/tmp/w.py && git log --oneline -- akasha/hook-system")).toBeNull()
  expect(said("python3 /var/tmp/w.py | grep akasha/hook-system")).toBeNull()
})

test("an interpreter in a later call is judged as a first one is", () => {
  expect(said("echo hi && python3 -c \"open('akasha/held.domain.ts','w')\"")).toContain(INSIDE)
})

test("a separator inside a quoted run does not cut the call", () => {
  expect(rawCallsIn("python3 -c \"import os; os.remove('akasha/x.ts')\"")).toEqual([
    "python3 -c \"import os; os.remove('akasha/x.ts')\"",
  ])
})

test("a separator outside a quoted run cuts the call", () => {
  expect(rawCallsIn("echo hi && rm /var/tmp/x")).toEqual(["echo hi", "rm /var/tmp/x"])
})

test("a heredoc body reaches the call that opened it", () => {
  const calls = rawCallsIn("python3 <<'EOF'\nopen('akasha/x.ts','w')\nEOF")
  expect(programHandedIn(calls, 0)).toContain("akasha/x.ts")
})

test("a heredoc body ends at its delimiter", () => {
  const calls = rawCallsIn("python3 <<'EOF'\nprint(1)\nEOF\nakasha test --file-path akasha/x")
  expect(programHandedIn(calls, 0)).not.toContain("akasha/x")
})

test("a call past a heredoc delimiter is another call", () => {
  expect(
    said("python3 <<'EOF'\nprint(1)\nEOF\nakasha test --file-path akasha/hook-system")
  ).toBeNull()
})
