---
id: 3b38a969-6396-5359-a97c-1c6bcb680933
slug: grep-no-ignore-files-fails-silently
page-type-slug: finding
title: "Grep no ignore files fails silently"
domain-slug: domain/agent-harness
---

# Claim

A verification script using `grep --no-ignore-files` silently reports a clean tree even when the checked-for string is present: interactively `grep` is a shell function routing to ugrep, which knows the flag, but a script subshell gets plain GNU grep, which does not — exits rc=2, COUNT=0 — and `2>/dev/null | wc -l` around it discards the stderr that would show the flag was rejected, making a dead command byte-identical to a genuinely clean tree.

# Evidence

From project #16213 (`agent-harness`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25, moved from retired `notes` 2026-08-15. Found by #16173's worker, reproduced independently by nimue (first attempt itself invalid, same family).

Measured, two-sided, positive control on the same corpus: in-script with flag → COUNT=0, rc=2, stderr `grep: unrecognized option '--no-ignore-files'`; in-script without flag → COUNT=1 (control, string present); interactive → works.

Correct fix: drop the flag, not add one — GNU grep never consults `.gitignore`, so plain `grep -ra` is already maximal; the flag only ever compensated for ugrep's default.

Taught in a repo doc: `packages/temper/addons/docs/library-rename-checklist.md:69,70,82`, fix in flight under #16173. Doc: anyone who ran a rename/enumeration check from a script should re-establish it; interactive runs unaffected; spread unknown, only the doc known to have taught it.

Transferable rule, sharper than "always add a control": the control must sit on the same invocation as the claim — one omitting the flag while the claim carries it lets both read "as expected" while the enumeration is empty. The doc's other controls were well designed (its `expect >0` control, run from a script, returns 0 and contradicts itself) — the failure was a control bound to a different invocation, not a missing one.

nimue's own reproduction was invalid the first time: she tested the flag against a string not present, so "no match" (exit 1) and "flag rejected" (exit 2) both read as failure, and she read the wrong one, concluding "GNU grep path" when the interactive shell actually accepts the flag. Caught only by re-running with a known-present string and capturing stderr — the same discard that hides the original bug.

Evidence grade: reproduced independently, two-sided, control on the same corpus and invocation. Blast radius not measured — the doc is the only confirmed teacher; adopting scripts not counted.
