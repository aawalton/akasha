---
id: cfa1ea54-56b4-5321-8d1a-9aedfb8f1043
page-type-slug: finding
title: "Manifest export target absent"
domain-slug: domain/pages-system
---

# Claim

`packages/shared/pages/cli/package.json` sells a subpath export whose file is in no tree, and
nothing in the repo can detect it. An `exports` entry resolves only when something imports it, so a
target that does not exist is inert until the first importer and then fails at that importer rather
than at the manifest. Nothing imports this one, which is why no build has failed on it, and no check
validates that an `exports` target exists — so the class is undetected, not just this instance.

# Evidence

Read and run 2026-08-07 against `~/code` at `main` `1313565199`.

The entry. `packages/shared/pages/cli/package.json:15` declares
`"./entity-surface/list-bound": "./src/entity-surface/list-bound.ts"`.

The target is absent. `git ls-files "packages/shared/pages/cli/src/entity-surface/list-bound*"`
returns nothing, and `ls` of that directory shows `config.ts`, `format.ts`, `index.ts`, their tests
and `verbs/` — no `list-bound.ts`.

Where the three pieces actually live: `packages/shared/cli-core/src/list-bound.ts` declares
`ENTITY_LIST_MAX` at `:19`, `splitOverfetched` at `:31` and `listTruncationAdvisory` at `:47`, with
its own unit tests beside it. `packages/shared/pages/cli/src/entity-surface/verbs/list.ts:9-11`
imports all three from there, and uses them at `:122` and `:141`.

Nothing imports the dead subpath. `git grep entity-surface/list-bound` returns exactly one line —
the manifest entry itself. Sibling subpaths under the same prefix are imported normally, by
`daily-tracking-cli` among others, so the prefix is live and this one entry is not.

Nothing detects the class. Searched `packages/infra/checks/src/checks/` for a check reading an
`exports` map: the three files matching are `check-ast-unused.ts`,
`check-unit-test-io-hermeticity.ts` and `report-cross-workspace-mock-reach.ts`, none of which
validates that a target resolves. `check-package-structure.ts` runs the inverse — its header says it
detects directories under `packages/` that LACK a `package.json`. `check-phantom-deps` reads
undeclared imports, which is the opposite direction from an undeclared file.

How it got here: the bound was homed inside the pages surface, then lifted out to `cli-core`. The
export survived the lift.

Not judged: whether the entry is deleted or a check is added failing a manifest whose `exports`
names a file the workspace does not hold — the second closing the class rather than this instance.

Found while ingesting `dirty/questions/code-repo-pages.md`, which states the same thing. That file
is quarantined and queued for removal.
