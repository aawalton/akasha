---
page-type-slug: finding
title: "Test files are typechecked by nothing"
domain-slug: domain/checks-system
---

# Claim

Nothing on the write path judges a test file. A test file excluded from its package's `tsconfig.json` is never typechecked, and the gate runs no test, so a test file can hold a plain type error and land clean.

This is not the same gap as the gate typechecking only changed files. That one is about which files are judged given a program; this one is about a file that never enters a program at all, however it is reached. A patch touching only test files is judged by nine gates and none of them looks at the types.

The workaround of running project-wide `tsc --noEmit -p tsconfig.json` does not close it, because that reads the same `exclude` and skips the same files.

# Evidence

Measured against `main` on 2026-08-28.

Of 11,244 tracked `.ts`/`.tsx` files, 7,995 sit under a project that could claim them. 7,175 are in that project's file list. **820 are not, and 774 of those 820 are test files.** A further 3,249 sit under no project at all and are judged under default options, which is a separate matter.

`rootsFor` in `checks-system/check/typecheck/typecheck.check.code.attachment.ts` is where they fall out: for a non-null owner it keeps only `held.filter((one) => owner.files.has(one))`, and returns `[]` when that is empty. A patch whose files are all unclaimed produces no program, so no diagnostic exists to filter.

Probed rather than inferred. Appending `const thisIsAProbe: number = "not a number"` to `automation/core/src/plan.unit.test.ts` and running `ops write --dry-run` returned `gate: 9 akasha check(s) over 1 changed file(s), none refused`.

The control is in the same folder and rules out the package being unjudged as a whole: `automation/core/tsconfig.json` excludes `./**/*.test.ts` and claims 10 files. `automation/core/src/plan.ts` is claimed; `automation/core/src/plan.unit.test.ts` is not.

Two test files broken badly enough that they could not load at all stood in `shared/pages-ui/src/cache/` until 2026-08-28, unseen by typecheck for the same reason — that package's `tsconfig.json` excludes `./**/*.test.ts(x)`.

Not measured: how many of the 774 currently hold a type error. That needs a program built per package over its excluded files, which was not run.
