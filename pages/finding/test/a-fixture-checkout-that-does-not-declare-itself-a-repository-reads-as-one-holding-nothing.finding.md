---
page-type-slug: finding
title: "A fixture checkout that does not declare itself a repository reads as one holding nothing"
domain-slug: domain/test
---

# Claim

A test that builds a fixture checkout and points `AKASHA_ROOT` at it is invisible to the code under test unless the fixture also holds a `.git` directory, and the invisibility is silent: every reader answers empty, which is the same answer a real checkout holding no such page gives. So the failure surfaces as broken assertions in the reader rather than as a fixture that was never seen, and the reader is where nobody looks. The guard causing it is right about its own case — a repo page outlives the checkout it names, and naming a root that is not on disk sends readers at `git -C` against a missing directory — but a guard that skips the absent cannot tell the absent from the not-yet-declared.

# Evidence

Found on 2026-08-28, from two suites failing in unrelated systems on the same day.

`resolveRoots` in `repo/roots/roots.ts` builds its map by naming each declared repository only where its checkout carries a `.git`:

```ts
for (const repo of REPOS) {
  const root = rootOf(repo)
  if (existsSync(`${root}/.git`)) at[repo] = canonicalize(root)
}
```

`tools/tests/agent-turn-colors.test.ts` builds a checkout under `mkdtempSync`, writes seat pages into `agent/seat` and domain pages into `pages/domain`, and sets `process.env.AKASHA_ROOT` to it. That directory is not a git repository, so `akasha` never enters the roots. `dirsOfPlaces(SEAT_PLACES)` reads `roots["akasha"]`, finds nothing, and answers `[]`. `seatPagePaths()` then answers `[]`, `seatPageForAgent` answers null for every id, and `colorsOf(["never-ran"])` answers `{}` — which is exactly what it answers for an id no seat ever held. Two of the file's cases failed on that, reading as two broken assertions about turn colours.

Measured both ways on 2026-08-28. Against the fixture as written, `resolveRoots()` answered the keys `code-editor, target` and `roots["akasha"]` was `undefined`. With one `mkdirSync(`${akasha}/.git`)` added and nothing else changed, `colorsOf(["never-ran"])` answered `{"never-ran":"text"}` and `colorsOf(["older-seat"])` answered for its seat. Landed at `d6571974`; the file is 13 pass, 0 fail.

It is not the reader that changed. The lookup in `seat-presence-read.ts` was replaced that same night with an index held for the length of a call, and both the old loop and the new map answer `null` on the fixture without the marker and answer the page with it. The reader was never the variable.

The second suite was `page-commit-queue-durability.test.ts`, failing 8 of 8 and read for a day as eight broken assertions. Its first-guess cause was that `registryOf` now builds the page type registry from the global index rather than by scanning the tree, which would make any fixture repo outside the index invisible in the same silent way. Whether that suite's cause is this one or that one was still open when this was filed; the two want different repairs, and both produce a true-looking empty.

What makes this expensive is not the guard but where the emptiness surfaces. A fixture that was never seen and a fixture holding nothing are one answer, and the assertion that fails is several modules downstream of the setup line that was incomplete.
