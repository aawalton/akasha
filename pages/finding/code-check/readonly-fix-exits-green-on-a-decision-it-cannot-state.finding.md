---
id: 3a2f7ef2-fe5e-541a-9fb6-592125778811
slug: readonly-fix-exits-green-on-a-decision-it-cannot-state
page-type-slug: finding
title: "Readonly fix exits green on a decision it cannot state"
domain-slug: domain/global
---

# Claim

`check-readonly-collections --fix` rewrites a mutable collection annotation to a readonly one, then exits 0 unconditionally, outside its own reporter. Where the collection is a parameter the function mutates, the rewrite manufactures a compile error the tool never reports and its `run typecheck to confirm` line hands to the author, with no rule in the corpus to resolve it by. It reads annotations and never the `.push` that makes one wrong, so the decision it forces is one it cannot state.

# Evidence

Measured in `~/code` at `ecf5f9518f769757f3c2d53227a449b79203a887`.

`readonly-collections` is registered: `ops enforcement list` names it against `packages/infra/checks/src/lib/scanner-registry.ts`.

In `packages/infra/checks/src/checks/check-readonly-collections.ts`, the per-file arm under `flags.fix` calls `applyFixes`, writes with `writeFileSync`, increments `filesFixed` and returns `[]` — so no finding survives into the reporter. Lines 209–215 then print `fixed N file(s); run typecheck to confirm.` and call `process.exit(0)`, ahead of and outside the `exitOnResult` carrying the violations and the exit code. The exit is 0 whatever the run found or rewrote.

What it detects is stated in its own header and success strings as "mutable collection types in escape positions" — the annotation. Nothing in the scan reaches a mutating call: `rg -n "push|splice|sort"` over the file returns only its own `out.push` at line 142 and a comment at line 97.

Nothing in the corpus resolves the error the rewrite produces. `rg -ni "readonly|aliasing"` over `~/instructions/domains/`, excluding `dirty/`, returns nothing, so no live unit says whether to rewrite the function as non-mutating or hoist the mutation to the caller.

Limits. I read the `--fix` path rather than running it, so how many files it would rewrite today, and whether a live mutated parameter is among them, are unmeasured. I did not check whether CI passes `--fix`; an author running it by hand meets this either way. The `.tstl` cohort exclusion belongs to `bundle-cohort-not-examined.md`.

Searched `~/memory/findings/` first: `rg -ni "readonly-collections"` returns `scanner-bundle-described-at-half-its-registry.md`, on a stale scanner count, and `bundle-cohort-not-examined.md`, on `preFileSkip` exclusion. Neither reaches this.

Found ingesting `dirty/questions/quarantined-prescriptions-repo-wide.md`, which recorded it against `77685cfbf5`. That source is removed; this is the reproduction at today's HEAD.
