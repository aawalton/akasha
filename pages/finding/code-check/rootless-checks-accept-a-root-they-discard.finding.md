---
id: 39314eb4-a516-56ad-8d38-6d87a1ac38a7
slug: rootless-checks-accept-a-root-they-discard
page-type-slug: finding
title: "Rootless checks accept a root they discard"
domain-slug: domain/global
---

# Claim

Registered checks that take no root flag at all accept `--repo-root` — or any invented flag — silently, and walk the tree their own source sits in while reporting a green over it.

# Evidence

Measured on branch `project-18682` at `2a89335`, over a plant tree holding one package and one `.ts` file, with each check run from an archive of the branch and pointed at the plant.

- `check-git-guard-both-forms --repo-root /var/tmp/plant628` exits 0 reporting `[over 10534 of 10534 executed-source files]`.
- `check-dep-versions` the same, `[over 394 of 394 package manifests]`.
- `check-cli-json-contract-coupling` the same, `[over 659 of 659 test files]`.

None of those members exists in the plant. All three resolve their root by `getRepoRoot()` at module or `main` scope and declare no `--repo-root`: `grep -c` for `STANDARD_FLAGS` or `"repo-root"` returns 0 in each, while `repoRoot` appears 2 to 4 times.

They do not validate flags either. Each was run with `--definitely-not-a-real-flag` and exited 0 with no complaint, so a caller cannot learn from the exit code or the output that the root it named was discarded.

This is a wider class than the nine #18628 closed, which were checks that DECLARED `--repo-root` and never read the parsed value. Those nine are repaired and verified. This class arrives by a different door and is not gated: a caller pointing any of these at another tree gets a confident reading of the wrong one.

It does not land at zero, so a check enforcing "every registered check honours a named root" cannot be written today under Zero At Landing. What has to be settled first is whether every registered check SHOULD accept a root — under branch CI they run inside the tree being judged, where `getRepoRoot()` is correct — or whether the repair is to refuse an undeclared flag rather than to thread a root through checks that have no use for one.

A sample of 27 of the 132 registered scripts #18628 did not touch produced these three plus five more reporting large populations over the plant at exit 0. The rest exited 2, which is the correct fail-closed reading. The full population was not measured.
