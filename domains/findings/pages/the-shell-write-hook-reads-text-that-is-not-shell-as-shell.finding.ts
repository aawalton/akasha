import type { Finding } from "../finding.page-type.ts"

export const theShellWriteHookReadsTextThatIsNotShellAsShell = {
  id: "01a06cf7-51d4-7000-9125-07804c6337ce",
  pageTypeSlug: "finding",
  slug: "the-shell-write-hook-reads-text-that-is-not-shell-as-shell",
  domainSlug: "workspace-package/hook-system",
  claim:
    "`block-akasha-shell-writes` refuses four shapes of call that write nothing into the checkout. Three of the four are one defect: it reads text that the shell would never run as a command as though it were one. The fourth resolves a relative path against the wrong directory. Each cost real time on 2026-09-04 and each pushed the agent that met it toward a workaround rather than the call it meant to make.",
  evidence:
    "Four reproductions, met on 2026-09-04 while repairing the flatten, numbered as they were first filed. None of them writes anything inside the checkout.\n\n" +
    "1 and 2 were a heredoc body read as a redirect, one carrying `>>>>>>> new` and one carrying `2>&1`. Both are fixed: `pastHeredocs` takes a body out from the line opening it to the line ending it, keeps the opening line so a redirect there is still read, and takes nothing out where the text never ends the body.\n\n" +
    '3. A variable in a redirect target is refused unexpanded. `... > "$SP/owed3.txt"` was refused as landing on `$SP/owed3.txt` "inside the akasha folder", where `SP` held a path under `/tmp`. Spelling the same path in full was admitted, so the refusal rests on the text of the target rather than on where it lands.\n\n' +
    "4. A relative path is resolved against the process directory rather than the one the command runs in. `cd /tmp/.../scratchpad && sed -i '...' scan2.mjs` was refused as landing on `scan2.mjs` \"inside the akasha folder\". The file is under `/tmp`; only the process directory made it look otherwise.\n\n" +
    '5. `bun` naming a path in the checkout as an argument is refused, whether or not it writes. `bun -e \'import("<a path in the checkout>")...\'` was refused with "a program\'s own text is not read here, so a write through it is not parted from a read, and naming the path at all is what is refused". This blocks a read-only probe, which is what it blocked: the call was a control proving an import fails, and it had to be dropped.\n\n' +
    "6. `sed -i` is refused by naming the script rather than the file. `sed -i 's/x/y/' file` is refused on the substitution rather than on `file`, so the refusal names something the call does not write.\n\n" +
    "What 3, 5 and 6 share is that the hook decides from the command's text without the shell's own reading of it: a variable it does not expand and an argument that is a path but not a target read alike to it. Reproduction 4 is apart from those three and is about which directory a relative path is resolved against.\n\n" +
    "What to do about any one of the four left is a ruling nobody has taken. Each is a judgement about what the hook should refuse rather than about how the hook reads, which is why the heredoc defect was fixed and these were not.",
} as const satisfies Finding
