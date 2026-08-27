---
id: cde84f74-851c-53e3-880b-13938c84cbea
page-type-slug: finding
title: "Shell hook hides package deps"
domain-slug: domain/agent-harness
---

# Claim

A hook registered as a bare shell path is not evidence that the hook is self-contained. `block-shell-active-prose-flag.sh` registers as 103 lines of shell but resolves its own directory to exec a TypeScript entrypoint beside it, which imports an npm package and a workspace alias and reads a generated artifact derived from the code repository's own CLI surface — so neither the registration, the extension nor the length parts it from the fourteen self-contained shell hooks registered beside it.

# Evidence

Measured 2026-08-04 in `~/code`.

`packages/infra/scripts/block-shell-active-prose-flag.sh`, 103 lines. Line 54 sets `SELF_PATH="${BASH_SOURCE[0]}"` and line 55 derives `SELF_DIR` from it by parameter expansion. Line 59 runs `exec bun "$SELF_DIR/src/block-shell-active-prose-flag.ts" --scope`; line 93 pipes the payload to the same file for the decision itself. The header comment at lines 52-53 explains the parameter expansion as an avoidance of `dirname` on a stripped PATH, and says nothing about what the resolved directory is then used for.

`packages/infra/scripts/src/block-shell-active-prose-flag.ts` imports `{ z } from "zod"` and `{ optionalEnv } from "@shared/utils-narrow/validate"`, and imports its pure core from `./shell-active-prose-flag`, which imports `zod` again and `./shell-word-lex`. It reads `ARTIFACT_PATH`, resolved from `import.meta.url` as `../../checks/src/lib/generated/prose-flags.generated.json` — 28,842 bytes, git-tracked, and also read by `check-cli-prose-flag-route-coverage.ts` and `check-no-prose-flag-teaching.ts`.

The remaining fourteen registered shell hooks were read for the same class of dependency and have none: no `source`, and no read of any other file in the repository. The five that reach `ops` do so at runtime, resolving `bun` from PATH.

`~/instructions` has no `package.json`, no lockfile and no `node_modules` — so neither the npm import, the workspace alias, nor the codegen artifact resolves there.
