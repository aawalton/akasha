---
id: 6e8a736b-f488-589e-89be-0becb0724234
slug: repo-paths-blind-to-directory-and-json-literals
page-type-slug: finding
title: "Repo paths blind to directory and JSON literals"
domain-slug: domain/global
---

# Claim

`check-repo-paths` cannot reach a repo path written as a directory prefix or carried in JSON, so a fossil directory literal is gated by nothing while file literals beside it are gated repo-wide.

# Evidence

Established by #18629 while closing the suppression-list defect, and left standing rather than repaired.

`check-repo-paths` already fails on any string-literal repo FILE path in TypeScript, JavaScript, shell or Lua that does not resolve, repo-wide and with no pragma. That is why the fifteen TypeScript-literal exemptions a review named were not the field: they are covered.

What it cannot reach is a path naming a directory rather than a file, and a path carried in a `.json` file. Two fossil directory prefixes sit in exactly that gap:

- `PAGES_PROC_RUNTIME_PREFIX` in `check-no-raw-pages-sql.ts` names `packages/shared/pages/proc/src/runtime/`, emptied by `09c34957a0` (#9908).
- `ESO_DOMAIN_PREFIXES` in `check-timezone-handling.ts` names `packages/shared/tasks/`, deleted by `cc9f3d4388` (#9327). This one is an inclusion prefix rather than an exemption, so it selects nothing rather than suppressing nothing.

Neither was deleted: each is a boundary its own check's owner drew, and nothing fails either way.

`NATIVE_SHELL_BUILT_ARTIFACT_PREFIX` scans identically and is NOT a fossil — `packages/alanwalton/native-shell/www/` was git-rm'd and gitignored by `3d3966b8a8` (#15271) because it is built at cut time. It is absent from a clean checkout and present after a build, the same class as the generated manifests `check-memory-qos` reads. Any widening has to keep this case green.

Widening `check-repo-paths` onto directory literals is the only derived way to close the remainder, and it cannot land at zero today: doc comments across the repo cite workspace directories as examples, and under Zero At Landing those would all have to be repaired or the widening declined.

What is unsettled, and why this is a finding rather than a project: whether a workspace directory cited as an example in prose is a violation at all. That is a judgment about the check's subject, not work to schedule.
