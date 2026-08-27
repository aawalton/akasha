---
id: 2c66ebbd-fdca-5441-8fcd-b31df30c64f3
page-type-slug: finding
title: "Create help silent on depth refusal"
domain-slug: barred-meaning/project
---

# Claim

`ops project create --help` describes `--parent-seq` without saying it refuses a parent that is itself a child, so the one surface `define-project` sends a lead to for the cut is silent about the only shape the verb rejects.

# Evidence

`decide-parent-depth.ts` landed in commit `44b4755fcf` and is called from `create.ts`: passing `--parent-seq <n>` where row `n` already carries a parent is refused, with a message explaining that a row holding both reads as `child`, that the child ladder has no rung for handing children out, and that the grandchild would be stranded.

`tasks/projects/define-project.md` reads `**Cut** each child as a row directly beneath this one: 'ops project create --help'`. That warrant was deliberately cut from the instruction (commit `24abc957`) on the grounds that the refusal teaches at the attempt, which it does. But the instruction now points at help text as the authority, and the `--parent-seq` flag description says only: "Global sequential number of the parent project. The child inherits the parent's owner (its home) unless --owner is also passed, in which case the explicit --owner wins."

A lead reading help before cutting sees nothing about depth, cuts a grandchild, and learns from the refusal — one wasted round trip per occurrence, and a reader who trusted the help to be complete.

The remedy is one clause on the flag's description in the command definition. This is not the same gap as re-parenting through `ops project update --properties-file`, which bypasses the decision entirely and is a separate hole.
