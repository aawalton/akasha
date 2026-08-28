---
page-type-slug: finding
title: "The typecheck gap lies wholly inside the suite gap"
domain-slug: domain/checks-system
---

# Claim

Two instruments judge this repository's test files. The set the typecheck drops lies wholly inside
the set the standard suite never reaches, so the smaller hole buys no cover from the larger one.

774 tracked test files are compiled by nothing and run by nothing. Both instruments report green
over them, and each reports green for a different reason.

# Evidence


tracked *.test.ts and *.test.tsx      2,415
    matching `tools/**/*.test.ts`           689
    outside the suite glob                1,726
    claimed by no owning tsconfig           774
      of those under `tools/`                 0
      of those matching the suite glob        0
    judged by neither                       774

    shared 372, temper 133, lua-compiler 130, infra 120, automation 14, alanwalton 4, stories 1

CONTAINMENT, NOT COMPLEMENT. All 774 sit outside the suite glob, so the typecheck gap is a subset of
the suite gap. They are not mirror images: 49 of the 125 tracked `.test.tsx` files are claimed by a
project and fall out of the suite alone. An earlier statement of this called the two sets exact
complements, which is tidier than the truth and wrong.

THE MECHANISM IS THE OPPOSITE OF WHAT IT LOOKS LIKE. `tools/` carries no `tsconfig.json` anywhere
beneath it, so its files have no owning project, fall to the default-options path, and are judged —
which is why `tools/lib/seat-resolve.ts` surfaced in that audit. It is at once the only directory the
suite glob covers and the one place the typecheck gap cannot reach. It is covered because nobody
configured it. Giving `tools/` a `tsconfig.json` that excludes tests would silently open the hole.

EXCLUDING A TEST FROM ITS PROJECT IS A LOOSENING. An excluded file is skipped entirely rather than
falling back to default options, so the narrowing looks like housekeeping while it happens.

VERIFIED: 774 entries, every one tracked, none under `tools/`, none matching the glob. `wc -l` says
773 because the file carries no trailing newline. The typecheck half was measured by thea.
