import type { Finding } from "../finding.page-type.ts"

export const mobileCliEscapesItsOwnSrcTenTimes = {
  id: "01a05c25-1719-7c28-81d9-25bf8b479ba0",
  pageTypeSlug: "finding",
  slug: "mobile-cli-escapes-its-own-src-ten-times",
  domainSlug: "domain/alan-harness",
  claim:
    "The initiative's memory says none of the nine folders left under alanwalton has a relative escape, so nothing is blocked. mobile-cli has ten, reaching four files in tools and four pages under code-system, and one of them closes a cycle: tools/lib/mobile-code.ts imports src/lib/apps.ts, which imports back into tools/lib. It is the one folder left that a move does not carry as it stands.",
  evidence:
    "Ten imports climb above src/. src/lib/apps.ts reaches ../../../../tools/lib/file-pages.ts, ../../../../repo/roots/roots, ../../../../tools/lib/page-derive-shape.ts and ../../../../tools/lib/page-query-values.ts. src/lib/ios-components.ts reaches four ios-program pages under ../../../../akasha/code-system/ios-program/ios-programs/. src/lib/www-build.ts reaches ../../../../tools/lib/code-root.ts, and src/mobile/sim/install-shell.ts reaches the same file one level deeper at five dots. Its own tsconfig already answers to this: rootDir is ../.., the repo root, so dist mirrors 234 files across fifteen top-level folders when only 28 are its own. Three more reaches stand outside the import graph, in shell scripts that load src/lib/ios-components.ts by literal path through bun -e: render-harness-run, alanwalton-decode-harness-run and smilingjenny-decode-harness-run. A name grep finds only 4 of the 28 inbound reaches; 24 come in by deep relative path, 15 of them in tools/lib/mobile-code.ts alone. Two further facts a move would meet: @shared/pages-query and @shared/pages-query/ask are imported by src/lib/cut-fingerprint.ts and declared in neither its dependencies nor its tsconfig references, resolving today only because the root hoists them; and src/lib/ios-components.ts holds the one error outside the lua compiler that tools/tsconfig.json reports, TS2367 at line 76.",
} as const satisfies Finding
