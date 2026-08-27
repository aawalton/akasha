---
id: ea837284-b74a-58c3-bcfc-b195bed255e9
slug: moved-body-repo-root-repoints
page-type-slug: finding
title: "Moved body repo root repoints"
domain-slug: domain/ops-cli
---

# Claim

A handler locating the repository from `import.meta.dir` keeps parsing and printing identically when its body moves here, and silently starts answering about the instructions repo instead of the code repo — so the move passes a `--help` comparison and every output diff that does not depend on which tree was walked.

# Evidence

Measured 2026-08-13, running `move-command-bodies` over the `talos`, `k8s` and `loki` namespaces.

Two of the seven bodies in that set carried the same private helper. `packages/infra/k8s/cli/src/k8s/synth.ts` and `packages/infra/ci/cli/src/k8s-orphans/orphaned-resources.ts` each declare `getRepoRoot()` as `execFileSync("git", ["rev-parse", "--show-toplevel"], { cwd: import.meta.dir })`. In the code repository that cwd is a directory inside the code tree, so the toplevel is the code repo. Moved here unchanged it is a directory under `tools/commands/`, so the toplevel becomes the instructions repo — which holds no `packages/infra/k8s/*/synth.ts` at all.

What the two verbs then do with that root is walk it: `synth` globs seven `DISCOVERY_GLOBS` under it and dynamically imports each match, `orphaned-resources` globs the same set and reads each file to extract manifest keys. Against the wrong root both globs match nothing, so `synth` writes and diffs zero files and exits 0, and `orphaned-resources` builds an empty source-key set — which makes every live workload unsourced and therefore an orphan. The first fails open and the second fails closed, and neither says which tree it walked.

Nothing in the move would have reported it. The capability declarations, the help block and the flag parsing are untouched by the root, so `--help` is byte-identical either way; `synth --check` against an empty file set exits 0 and prints nothing, which is also exactly what a clean pass looks like. Both were repointed at `codeRoot()` from `tools/lib/code-root.ts`, keeping the `git rev-parse` rather than assuming the root is the toplevel, and `k8s synth --check` then reproduced its 14-file drift report byte-for-byte and `k8s orphaned-resources --json` its 10-namespace result.

Not measured: whether any other body already moved into `tools/commands/` reads `import.meta.dir`, `import.meta.path`, `process.cwd()` or `__dirname` for the same purpose. The two here were found by reading the bodies, not by a search across the moved set.
