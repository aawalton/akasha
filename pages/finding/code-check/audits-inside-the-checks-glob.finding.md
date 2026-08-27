---
id: a2a61aff-164a-5baa-b91b-cb81b1fa73f4
page-type-slug: finding
title: "Audits inside the checks glob"
domain-slug: domain/global
---

# Claim

`code-check`'s `code-path:` claims the whole checks package, so the four audit modules inside it
are governed by `code-check` and by nothing that says what an audit is.

# Evidence

Measured 2026-08-06 by the `review-instructions` reading of `domains/code-check.md`.

`domains/code-check.md:7` declares `code-path: packages/infra/checks/**`.

`ops instructions governs --file-path
/var/home/walton/code/packages/infra/checks/src/audits/retired-status-rows.ts` returns eleven
surfaces. `domains/code-check.md` is among them. `domains/audit.md` is not.

`domains/audit.md` is four frontmatter keys — `domain-slug`, `domain-parents: instrument`,
`reviewed-at` — and declares no path key of any repository. Its definition is "code run on what is
already there, to find problems", against `code-check`'s "code run on a change to the code repo's
main, to say if it may be made". They are different objects.

`packages/infra/checks/src/audits/` holds four audit modules and three unit tests:
`color-rule-coverage.ts`, `doctrine-path-citations.ts`, `retired-status-rows.ts`,
`skill-morph-groups.ts`. An author of any of them is routed to `Removal First` and
`Zero At Landing`, both of which speak of checks, and to no claim about audits.

`find . -maxdepth 4 -type d -name checks` on the code repo returns `./packages/infra/checks`
alone, so the audits tree has no sibling location a narrower glob could avoid: the checks
themselves are at `packages/infra/checks/src/checks/`, and the surrounding `lib/`, `run-check.ts`,
`enrichers/` and `producers/` are check machinery a check author does touch.

NOT MEASURED. What a narrower glob on `code-check` would stop routing that it should route. Whether
`audit` should carry `packages/infra/checks/src/audits/**` instead, and what that would charge its
readers. Whether any other domain in the estate declares a path over a tree holding a sibling
domain's material.
