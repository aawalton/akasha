---
page-type-slug: finding
title: "The typecheck gap and the suite glob are exact complements"
domain-slug: domain/checks-system
---

# Claim

Two instruments judge this repository's test files, and the set each misses is exactly the set the
other covers. The typecheck drops a file its owning project does not claim; the standard suite
weighs only what its glob matches. Neither hole is inside the other.

774 tracked test files are compiled by nothing and run by nothing. Both instruments report green
over them, and each reports green for a different reason.

# Evidence

tracked *.test.ts and *.test.tsx        2,415
    matching `tools/**/*.test.ts`             689
    claimed by no owning tsconfig             774
      of those under `tools/`                   0
      of those matching the suite glob          0
    judged by neither                         774

    shared 372, temper 133, lua-compiler 130, infra 120, automation 14, alanwalton 4, stories 1

THE MECHANISM IS THE OPPOSITE OF WHAT IT LOOKS LIKE. `tools/` carries no `tsconfig.json` anywhere
beneath it, so its files have no owning project, fall to the typecheck's default-options path, and
are judged — which is why `tools/lib/seat-resolve.ts` surfaced in that audit. `tools/` is at once
the only directory the suite glob covers and the one place the typecheck gap cannot reach. That is
why the two sets do not overlap at all.

EXCLUDING A TEST FROM ITS PROJECT IS A LOOSENING, NOT TIDYING. A file a project excludes is skipped
entirely rather than falling back to default options, so the narrowing was available to anyone doing
housekeeping and looks like an improvement while it happens.

THE GLOB IS NARROW TWICE. Beyond the `tools/` prefix it names `.test.ts` and not `.test.tsx`, and
none of the 125 tracked `.test.tsx` files sits under `tools/`. Widening the prefix alone would still
catch none of them; both halves have to move.

VERIFIED RATHER THAN TAKEN. The file list holds 774 entries, every one tracked in git, none under
`tools/`, none matching the suite glob. `wc -l` reports 773 because the file carries no trailing
newline.

The typecheck half was measured by thea and the suite half here; neither of us could see the
composition from our own side.
