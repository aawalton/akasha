import type { Finding } from "../finding.page-type.ts"

export const aStylesheetGetsItsOwnReaderRatherThanItsOwnCheck = {
  id: "01a05c4b-ef18-77c6-b7ef-441d528dd9de",
  pageTypeSlug: "finding",
  slug: "a-stylesheet-gets-its-own-reader-rather-than-its-own-check",
  domainSlug: "domain/akasha-check",
  claim:
    "The third half is landed: manifest-names-what-is-reached reads a `.css` now. The stylesheet got its own reader inside the one check rather than a check of its own, because no-code-comments already reads `.css` that way through change-walking's own selector. A `url()` is read as a reach beside an `@import`, since reading `@import` alone would leave `@fontsource-variable/geist` refused, and the widening only ever credits.",
  evidence:
    "change-walking already stated the shape and shipped it: `A body read as a stylesheet is named .css`, `A check judging both reaches them through one selector`, and `styleNamed`, `bodyNamed`, `BODIES`, `overEachBody`. no-code-comments dispatches at its `found` on `styleNamed(path)` to a scan and files the parser it wants as a gap. This followed that exactly: `holdingBy` reads `bodyNamed`, and a new `reachFrom` sends a `.css` to `styleReachIn` and all else to `reachIn`. A second check would have answered for one rule twice and needed approval under Alan Approves Checks; this needed none, refusing strictly less. The reached-but-unnamed half is still guarded by `.ts` at its own line, so no stylesheet is refused for reaching what its manifest does not name: the widening only credits, as the `.tsx` one did. Audit held at 11 for this check, all `@capacitor`, before and after. Two things turned up. `reachIn` answers `zod` for `@import \"zod\";` because TypeScript's error recovery reads it as a side-effect import, so feeding a `.css` to the code parser would half-work and never see a `url()`. And `chess-board-look.stylesheet.styles.css` already `@import`s `chessground` inside akasha, credited today only because a `.tsx` reaches it too. stylesheet.page-type.ts states an absence, `A stylesheet imports nothing`, that both that file and design-system's index.css contradict.",
} as const satisfies Finding
