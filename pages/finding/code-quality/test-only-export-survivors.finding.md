---
id: 4ffc29df-27a7-5ec0-bec9-5b5317281f13
slug: test-only-export-survivors
page-type-slug: finding
title: "Test only export survivors"
domain-slug: domain/code-quality
---

# Claim

`packages/agents/instructions` is a package whose production surface is two path
functions, with the rest of its exports held alive by their own unit tests rather than
by any caller.

# Evidence

Observed 2026-08-04 while clearing `check-ast-unused` on the CI cutover branch
`project-17805`.

The instruction-writing verbs moved out of the code repo, and the commit series that
followed deleted their machinery: `apply-plan.ts`, `plan.ts`, `gate.ts`, `census.ts`,
`rename.ts`, `sweep.ts`, `prior-art.ts` and roughly thirty more under
`packages/agents/instructions/src/lib/`. What was left kept exporting the shell that had
served them.

`check-ast-unused` found 15 such exports and I removed them: `DEFAULT_BRANCH`,
`codeRoot`, `codeWorktree`, `CODE_ROOT_ENV`, `CODE_WORKTREE_ENV`, `git`, `isGitRepo`,
`listTrackedSurfaceFiles`, `resolveSurfacePath`, `remoteNames`, `openInstructionsRepo`,
`readBody` from `instructions-repo.ts`; `RelativeTarget`, `resolveRelativeTarget` from
`link-resolve.ts`; `gitIn` from `scratch-tree.ts`. The check is green at zero.

WHAT THE CHECK CANNOT SEE. A test file counts as an entry to `check-ast-unused`, so an
export reached only from its own unit test reads as reached. Nine survive in
`instructions-repo.ts`. A grep across `packages/` excluding `dist/` finds callers
outside the module for exactly two — `findInstructionsRoot`
(`agents/cli/src/agent/pin-identity.ts:54`, `resolve-stated-identity.ts:29`) and
`instructionsRoot` (`agents/instructions/src/instructions/tool-door.ts:23`). The other
seven are named only in `instructions-repo.unit.test.ts`.

Three of those seven describe machinery that is gone. `readGitResult` and
`resolveGitTimeout` shape the output and timeout of a git spawn this module no longer
makes — `git()` was their only caller and it was one of the fifteen.
`INSTRUCTIONS_ROOT_WRITE_ENV` still calls itself the declaration "the mutating verbs
share", and there are no mutating verbs here.

NOT MEASURED. Whether `listSurfaceFiles` has a non-test consumer a grep does not see;
whether the same shape holds in `instruction-surface`, which lost `classify.ts` and
`anchors.ts` in the same series; how many other packages carry exports whose only entry
is their own test.
