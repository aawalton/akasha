---
id: 07dd9284-513d-552a-96a3-94c0ca2ea75d
slug: generate-rbac-ignored-every-unknown-flag
page-type-slug: finding
title: "Generate rbac ignored every unknown flag"
domain-slug: domain/ops-cli
---

# Claim

Until its body moved, `ops ci-workflows generate-rbac` answered a misspelled check flag by emitting the YAML. Its five `--check*` arms were read with `argv.includes`, so `--check-manifets` matched none, fell past all five, and exited 0 having generated a ClusterRole — the same exit as the clean check it was asked for. Moving the body onto the declared parser closed this; it is filed because the old behaviour stood for as long as the verb has.

# Evidence

Measured 2026-08-13 on the workstation, running `move-command-bodies` over the `ci-workflows` namespace.

The old parse. `packages/infra/ci/workflows/src/generate-rbac.ts` line 42, `export async function main(argv)`, is five sequential `if (argv.includes("--check…")) { … return }` arms and then the assembly path. No arm is reached by a near miss and nothing enumerates what was passed, so an argument matching none of the five is indistinguishable from none at all.

Confirmed against the verb as it stood. `ops ci-workflows generate-rbac --bogus` exited 0 and wrote the ServiceAccount + ClusterRole + ClusterRoleBinding triple to stdout. Through the moved body the same invocation exits 1 with `unknown flag: --bogus`.

Why it matters more than a usual typo. The `--check*` arms are verdicts — `--check-manifests`, `--check-pipelines`, `--check-cluster-grants` each exit non-zero on a coverage failure. A caller who misspells one gets exit 0, which reads as the check having passed. A CI step wired that way is green because nothing ran.

What moving the body changed and what it did not. The help block is byte-identical before and after, and every declared flag behaves identically — `--check` and `--check-pipelines` were both run on each side and their stdout, stderr and exit codes compared byte for byte. The only difference is that an undeclared argument is now refused rather than dropped.

Whether any caller anywhere passes a flag this now refuses is unmeasured. The two examples the help declares and the CI invocation named in the code repository's own header (`bun packages/infra/ci/workflows/src/generate-rbac.ts`, which does not go through this verb) all pass either nothing or one declared flag.
