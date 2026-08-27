---
id: a2a61aff-164a-5baa-b91b-cb81b1fa73f4
slug: audits-inside-the-checks-glob
page-type-slug: finding
title: "Audits inside the checks glob"
domain-slug: domain/global
---

# Claim

`code-check`'s `code-path:` claims the whole checks package, so the four audit modules inside it
are governed by `code-check` and by nothing that says what an audit is.

# Evidence

Measured 2026-08-06 by the `review-instructions` reading of `domains/code-check.md`.

`domains/code-check.md:7` declared `code-path: packages/infra/checks/**`. No `code-path:` key stands
in this tree; the same routing arrives another way. `pages/package/infra-cluster-checks.package.md:7`
declares `domain-parent-slug: domain/old-check`, so everything in the package — the audits included —
sits under the check domain, `pages/domain/old-check.domain.md`, and under nothing pointing at
`pages/domain/audit.domain.md`.

`pages/domain/audit.domain.md:11` defines an audit as "an instrument run on state, reporting the
problems it finds", against `pages/domain/old-check.domain.md:11`'s "an instrument run on a
provisional change, ruling on whether it may be kept". They are different objects, and no page
binds the audit modules to the first.

`infra/cluster-checks/src/audits/` holds the audit modules — `skill-morph-groups.ts` and
`rule-population.ts` here, where four stood in the code repo. An author of either is routed to
`Removal First` (`pages/domain/old-check.domain.md:39`) and `Zero At Landing` (`:91`), both of which
speak of checks, and to no claim about audits.

The audits tree has no sibling location a narrower scope could avoid: the checks themselves are at
`infra/cluster-checks/src/checks/`, and the surrounding `lib/` and `run-check.ts` are check machinery
a check author does touch.

NOT MEASURED. What a narrower glob on `code-check` would stop routing that it should route. Whether
`audit` should carry `packages/infra/checks/src/audits/**` instead, and what that would charge its
readers. Whether any other domain in the estate declares a path over a tree holding a sibling
domain's material.
