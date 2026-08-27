---
id: 1c1cf9e2-fb9f-512b-a1d0-926350c16f9e
page-type-slug: finding
title: "Governs answers for an absent path"
domain-slug: domain/global
---

# Claim

`ops instructions governs` answers for a path that exists in neither repository, labelling it
`(code)` and returning the code-repo governing set, so a mistyped path and a wrong-tree path each
return a confident answer indistinguishable from a correct one.

# Evidence

Measured 2026-08-04, firsthand, three invocations.

`ops instructions governs tasks/lead/define-project.md` with cwd `~/code` returns `(code)` over
`domains/code.md`, `domains/global.md`, `folders/code-repo.md`. No file stands at
`~/code/tasks/lead/define-project.md`; `ls` refuses it.

The same argument from cwd `~/instructions` returns `(instructions)` over `domains/agent-harness.md`,
`domains/global.md`, `domains/memory.md`, `domains/project.md`, `domains/role.md`, `domains/task.md`,
`folders/instructions-repo.md` and `roles/lead.md` — a different set, and the correct one.

`ops instructions governs tasks/lead/no-such-file-xyz.md`, which exists in neither tree, returns the
same `(code)` triple. Existence is not consulted on either arm.

The cost is where the verb is relied on to find what governs a path: a governing set that omits
the surface actually binding a claim reads exactly like a complete one. Found by running it from
the wrong cwd during a pass that relied on it, not by looking for it.

Not measured: whether the tree is keyed on cwd, on path shape or on a default; whether `ops
instructions champions`, `dag` or `read` share the resolution; whether any caller depends on the current
behaviour; and whether a refusal on a nonexistent path would break the code-repo arm, where the verb
is legitimately asked about paths under `~/code`.
