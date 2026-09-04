import type { Finding } from "../finding.page-type.ts"

export const twoOfTemperWebsTailwindSourceGlobsHadMatchedNothingForSomeTime = {
  id: "01a0640f-8510-70e5-a47d-ef66c0d803bc",
  pageTypeSlug: "finding",
  slug: "two-of-temper-webs-tailwind-source-globs-had-matched-nothing-for-some-time",
  domainSlug: "domain/temper",
  claim:
    "`temper/web/app/globals.css` names `../../player-completion-ui/src/**` and `../../player-economics-ui/src/**`. Both hold no TypeScript at all: those packages moved into `akasha/temper`, and what is left at the old paths is `dist`, `node_modules` and a `tsconfig.tsbuildinfo`. Tailwind raises nothing for a glob matching nothing, so the live app has emitted no utilities for fifty class-bearing files, with no run saying so.",
  evidence:
    "Counted 2026-09-02 while rewriting the twelve globs for `temper-web-look`. `find` over `temper/player-completion-ui` and `temper/player-economics-ui` returns 4 and 21 TypeScript files, every one of them under `dist` or `node_modules`; neither holds a `src`. The akasha destinations hold 9 and 41 files.\n\nThe same census found `temper/characters-equipment-ui` gone from the disk entirely, while its glob had already been rewritten to `../../../akasha/temper/temper-characters-equipment-ui`. So of the eleven directory globs, two named a path that had been emptied and nine named one that still held files. Whoever moved those two packages rewrote the glob for one sibling and not for the other two.\n\nThis is the failure mode the replacement was written against, and it is why `temper-web-look` names one glob over the whole of `akasha/temper` rather than one per package. Three seats are moving 271 components into that tree concurrently and choosing their own folders as they go — a per-package glob would have to be right about a destination nobody has settled. The broad one reaches 16,345 files where four per-package globs reached 280, which costs scan time and cannot silently miss.\n\nWhat has no instrument: nothing counts what a `@source` glob reaches, so this was found by hand and the next one will be too.",
} as const satisfies Finding
