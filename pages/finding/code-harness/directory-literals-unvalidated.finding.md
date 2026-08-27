---
id: afa18ed4-55bb-510f-b2a4-ff8a2d74db91
slug: directory-literals-unvalidated
page-type-slug: finding
title: "Directory literals unvalidated"
domain-slug: domain/global
---

# Claim

In `packages/infra/checks/src/lib/repo-path-resolver.ts`, `isAcceptableForCheck` returns false for any path literal whose basename contains no dot, so every directory literal in the codebase is exempt from validation — no gate in the tree checks that a referenced directory actually exists.

# Evidence

From project #16429 (domain `code-harness`, status `someday_maybe`). Surfaced by worker-16406 during #16406. Never carried an objective — this is its capture.

Mechanism: `isAcceptableForCheck` computes a path literal's basename and returns false when it has no dot:
  const basename = lastSlash === -1 ? literal : literal.slice(lastSlash + 1)
  if (basename.length === 0) return false
  if (!basename.includes(".")) return false
Intent is to skip non-file references; effect is that every directory literal is exempt from validation.

Proving instance: `rbac-check-manifests.ts` carried a `MANIFEST_APPLIES` entry pointing at `packages/temper/next/deploy/k8s`, deleted by #10157 when temper/next was retired. It survived because basename `k8s` has no dot. The consumer swallows the resulting ENOENT (`collectYamlFiles` returns `[]` on a failed `readdirSync`), so the check printed "No YAML files found in packages/temper/next/deploy/k8s" on every run since #10157 and exited 0 anyway. #16406 removed that entry; the blind spot that hid it is untouched.

Why it matters: statically detectable and cheaper to detect than the alternative — nobody noticing for ten weeks. Defect-hiding, not merely idle: a stale directory reference reads as live configuration.

Before building: the dot heuristic likely exists to avoid false positives on non-path strings containing a slash. Removing it wholesale will likely flag many literals — measure the violation set first and inspect its composition before deciding between a check, a curated allowlist, or leaving it. Do not assume a two-line predicate change is the fix.

Same family, also in scope: two remaining `MANIFEST_APPLIES` source strings ('temper.yml ci-apply-manifests', 'alanwalton.yml ci-apply-manifests') name workflow files that no longer exist under those names (workflows are now `*.workflow.ts`) — display-only strings in warning/gap messages that mislead a reader without failing anything.
