---
id: f3443ba5-35ba-5816-815d-76a0f2134343
slug: pragma-markers-name-no-declaration-of-ours
page-type-slug: finding
title: "Pragma markers name no declaration of ours"
domain-slug: domain/code-comment
---

# Claim

Every declaration this repo's own tools parse classifies as `prose` — the class `tools/code-comment/strip.ts` deletes most freely — and not as `candidate`. So the remedy `pages/finding/code-comment/strip-proof-blind-to-parsed-comments.finding.md` proposes, having the strip stop at `candidate` rather than only at `form`, would have saved none of them. `PRAGMA_MARKERS` holds twenty-two markers, and every one belongs to a third-party toolchain.

# Evidence

`strip.ts:62` cuts every comment `classify` does not return `form` for, so `candidate`, `instruction` and `prose` go alike. `looksParsed` (`forms.ts:118`) is the only thing raising a comment to `candidate`, and it tests `PRAGMA_MARKERS` (`:93`) alone — twenty-two of them, `@ts-`, `eslint`, `biome-`, `noqa`, `vim:` and the like, every one a tool from outside this system.

I ran `classify` against the current list and one specimen of each shape:

```
prose  // test-classification: model
prose  // process-start: hermetic — spawns bash -n on a temp file
prose  // predicate-derivation: open-sample — spellings in the corpus
prose  // worker-shape: tick-yield-irreducible
prose  // level-decider: decideLevel
prose  // seat-resume-driver: narrows(argvFor) — the launch path
prose  // agent-launch-gate: narrows(spawnWatcher) — gate
prose  /** @guard name-claim */
form   // ast-unused: keep — read by the CLI
form   // @ts-expect-error bad on purpose
```

The two returning `form` are the two the list names. `tree.ts:47` sets aside only `machine-written` and `under test` paths, so ordinary source carrying the rest is reached.

Readers and live counts come from one reading of `~/code` at main that I dispatched and did not repeat: `predicate-derivation` at `predicate-derivation-scan.ts:52`, 306 instances, each carrying a free-text warrant held nowhere else; `level-decider` 13; `seat-resume-driver` 3; `worker-shape` 2; `agent-launch-gate`, `liveness-subject` and `@guard` one apiece. It also found `check-test-classification` intact on main, 41 and 7 markers standing, the sweep having landed on project-19104's branch alone.

NOT MEASURED: I did not run the strip, so no deletion was watched — the classification is observed, the deletion read off `strip.ts:62`. The readers and counts are secondhand; I confirmed no token myself. Swift, Rust and XML went unsearched, and a reader building its token at runtime would surface in no search of this kind.
