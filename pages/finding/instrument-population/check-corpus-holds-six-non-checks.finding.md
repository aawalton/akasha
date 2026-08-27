---
id: 838b731c-05ec-513e-8a1f-90811afb48e2
page-type-slug: finding
title: "Check corpus holds six non checks"
domain-slug: domain/instrument-population
---

# Claim

`check-verdict-emitter-chokepoint` builds its corpus from a directory listing with no predicate asking whether a member is a check, so it judges six files that are not checks, and five of the seven entries in the `BYPASS_SIZE` ratchet are among them.

# Evidence

Measured 2026-08-07 against `~/code` at `ecf5f9518f`. A quarantined document reported four such files on 2026-07-29; the count has grown, so this is filed at today's figure rather than relayed.

`corpusFiles` at `packages/infra/checks/src/checks/check-verdict-emitter-chokepoint.ts:69` is `readdirSync(join(repoRoot, CORPUS_DIR)).filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))`. Nothing downstream of it asks whether a member is a check. The readdir is deliberate and its docblock argues for it — *"The corpus is the directory listing, not a hand-kept list."* The defect is the missing predicate, not the listing.

Six corpus members are ops verbs or reporting scripts rather than checks, by `git ls-files` over `src/checks/*.ts` excluding `check-*` and `*.test.ts`: `deletion-residue.ts`, `enforcement-list.ts`, `enforcement-new-rule.ts`, `irreversible-list.ts`, `lint-verdict.ts`, `report-cross-workspace-mock-reach.ts`.

`BYPASS_SIZE` is 7, held by equality so that every change to the un-routed set is a visible edit. `verdict-emitter-chokepoint.config.json` holds seven entries and **five** are among those six: `deletion-residue.ts` (`writes-its-own-report`), `enforcement-list.ts`, `enforcement-new-rule.ts`, `irreversible-list.ts` and `lint-verdict.ts` (all `writes-its-own-verdict`). Only `check-addon-build.ts` and `check-build-graph.ts` are checks. So a number meant to state *how many checks emit a verdict outside the reporter* is five-sevenths about something else, and a reader watching it move cannot tell which population moved.

The check is registered: `ops enforcement list` names `check-verdict-emitter-chokepoint` from `check-configs-source-scanners.ts`.

There is an `orphan-not-a-check` violation kind, and it does not close this: at `lib/verdict-emitter-chokepoint.ts:188-195` it fires only for a bypass entry absent from the corpus — a fossil left by a rename. A corpus member that is not a check raises nothing.

Not established: whether the package has anywhere else to put a verb.
