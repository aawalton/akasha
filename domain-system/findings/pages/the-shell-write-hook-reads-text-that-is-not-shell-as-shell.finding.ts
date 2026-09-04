import type { Finding } from "../finding.page-type.ts"

export const theShellWriteHookReadsTextThatIsNotShellAsShell = {
  id: "01a06cf7-51d4-7000-9125-07804c6337ce",
  pageTypeSlug: "finding",
  slug: "the-shell-write-hook-reads-text-that-is-not-shell-as-shell",
  domainSlug: "domain/hook-system",
  claim:
    "`block-akasha-shell-writes` refuses six shapes of call that write nothing into the checkout. Five of the six are one defect: it reads text that the shell would never run as a command as though it were one. The sixth resolves a relative path against the wrong directory. Each cost real time on 2026-09-04 and each pushed the agent that met it toward a workaround rather than the call it meant to make.",
  evidence:
    "Six reproductions, all met on 2026-09-04 while repairing the flatten. None of them writes anything inside the checkout.\n\n" +
    "1. A heredoc body carrying `>>>>>>> new` is read as a redirect. `cat > /tmp/x/p.patch <<'EOF'` whose body holds conflict markers was refused with \"a redirect lands on `>>>>>` , inside the akasha folder\". The markers are data being written to a file outside the checkout; the shell never parses a quoted heredoc body.\n\n" +
    '2. A heredoc body carrying `2>&1` is read as a redirect target. Writing a shell script whose text holds `akasha test --file-path "$f" > "$OUT/$n.log" 2>&1` was refused with "a redirect lands on `2>&1`, inside the akasha folder". Same class as 1: the body is written, not run.\n\n' +
    '3. A variable in a redirect target is refused unexpanded. `... > "$SP/owed3.txt"` was refused as landing on `$SP/owed3.txt` "inside the akasha folder", where `SP` held a path under `/tmp`. Spelling the same path in full was admitted, so the refusal rests on the text of the target rather than on where it lands.\n\n' +
    "4. A relative path is resolved against the process directory rather than the one the command runs in. `cd /tmp/.../scratchpad && sed -i '...' scan2.mjs` was refused as landing on `scan2.mjs` \"inside the akasha folder\". The file is under `/tmp`; only the process directory made it look otherwise.\n\n" +
    '5. `bun` naming a path in the checkout as an argument is refused, whether or not it writes. `bun -e \'import("<a path in the checkout>")...\'` was refused with "a program\'s own text is not read here, so a write through it is not parted from a read, and naming the path at all is what is refused". This blocks a read-only probe, which is what it blocked: the call was a control proving an import fails, and it had to be dropped.\n\n' +
    "6. `sed -i` is refused by naming the script rather than the file. `sed -i 's/x/y/' file` is refused on the substitution rather than on `file`, so the refusal names something the call does not write.\n\n" +
    "What the five share is that the hook decides from the command's text without the shell's own reading of it: a quoted heredoc body, a variable it does not expand, and an argument that is a path but not a target all read alike to it. Reproduction 4 is apart from the other five and is about which directory a relative path is resolved against.\n\n" +
    "This is filed rather than fixed: the hook's code is untouched here, and what to do about any one of the six is a ruling nobody has taken.",
} as const satisfies Finding
