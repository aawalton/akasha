import type { Finding } from "../finding.page-type.ts"

export const aMoveInsideBreaksWhatIsOutside = {
  id: "01a05931-1982-731d-9cf8-4c61aac946c2",
  pageTypeSlug: "finding",
  slug: "a-move-inside-breaks-what-is-outside",
  domainSlug: "workspace-package/checks",
  claim:
    "Moving a module inside the akasha folder broke six files outside it that import it, and every gate read green while it was broken. No check judges what the repository outside akasha imports from inside it, and no typecheck spans the two. Fifty-three imports cross that way today, held by whoever remembers to look.",
  evidence:
    "`330b3b3291` moved the page-value reader out of `index-entries` at 12:52:19 and repointed the thirty-seven files under `akasha/` naming it. Six under `tools/lib` name the same readers and were not repointed: `akasha-closeness.ts`, `akasha-domains.ts`, `akasha-people.ts`, `akasha-personas.ts`, `claude-account-akasha.ts`, `seat-akasha-read.ts`. A seat starting in that window died with `SyntaxError: Export named 'numberAt' not found`. `58a8ad9b15` repaired them at 12:55:42. In between, `akasha test` said 2406 pass and 0 fail, `akasha lint` found nothing, `akasha index refresh` refused nothing, and `package-reached-where-named` found no violation over 1192 files. `checks-system.workspace-package.ts` states the absence deliberately: no check judges what a repository outside akasha imports from inside it. There is also no `tsconfig.json` at the repository root, so nothing typechecks across the boundary either. Walking every relative import from outside the folder into it counts fifty-three, of which the move touched six.",
} as const satisfies Finding
