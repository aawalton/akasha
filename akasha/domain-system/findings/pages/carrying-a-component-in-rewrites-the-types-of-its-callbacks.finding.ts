import type { Finding } from "../finding.page-type.ts"

export const carryingAComponentInRewritesTheTypesOfItsCallbacks = {
  id: "01a05bb1-0c05-725d-8950-e3c5cf3dd9f7",
  pageTypeSlug: "finding",
  slug: "carrying-a-component-in-rewrites-the-types-of-its-callbacks",
  domainSlug: "domain/akasha-migration",
  claim:
    "A component carried into akasha cannot keep `=> void` on a callback prop, and changing it to `=> undefined` reaches back out of the file into every caller that passes a function. Six files of Alan's site cost two such edits, one of them in a file the move was not otherwise touching. The interior holds eighty tsx files and will pay this at a scale nobody has counted.",
  evidence:
    "`no-void-return` refused `chess-move-list.module.code.tsx` at lines 8 and 38, both `readonly onJump: (ply: number) => void`. The landed shape is `=> undefined`, written twenty times across `design-badges` and `design-forms`, among them `onChange?: (checked: boolean) => undefined` in `checkbox-badge`.\n\nThe cost is not the two lines. A block-bodied arrow with no return statement is typed `void`, and `void` is not assignable to `undefined`, so every caller handing such a function in must be changed too. Here that was `chess-board.module.code.tsx:119`, where `useCallback((ply: number) => {` became `useCallback((ply: number): undefined => {`. The caller sat inside the same move, so it was cheap. A caller left behind in `alanwalton/web` would not have been, and nothing in the refusal names it.\n\nThe refusal reads only the file it judges, so the callers surface one build at a time rather than all at once. `akasha audit --check typecheck` is what finds them, over 3730 files, and `bun test` does not.",
} as const satisfies Finding
