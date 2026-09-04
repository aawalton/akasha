import type { Finding } from "../finding.page-type.ts"

export const theOldFileKindPagesKnowFourKindsTheClassifierTheyLookRedundantToDoesNot = {
  id: "01a06576-00b3-7831-99c8-dcfe2f166430",
  pageTypeSlug: "finding",
  slug: "the-old-file-kind-pages-know-four-kinds-the-classifier-they-look-redundant-to-does-not",
  domainSlug: "domain/akasha-migration",
  claim:
    "The 33 pages in `pages/file-kind` read as a page-shaped copy of the live classifier in `file-kind/file-kind.ts`, and ablating them on that reading would silently lose four file kinds the classifier has never known: mjs, cjs, jsonl and bash. Neither the pages nor the classifier can go until the classifier lands in akasha carrying all 33.",
  evidence:
    'Checked 2026-09-02 by taking the `name-pattern` off each of the 33 pages and looking for its extension in file-kind/file-kind.ts. Twenty-nine are handled. Four are absent from the classifier entirely, `grep -c` answering 0 for each: `*.mjs` ("a file of JavaScript source loaded as a module"), `*.cjs` ("loaded as a CommonJS module"), `*.jsonl` ("one JSON value to a line") and `*.bash` ("shell script written for bash").\n\nThree of the four are live misreadings rather than gaps in theory. `classifyExtension` tests `relPath.endsWith(".json")`, which is false for a path ending `.jsonl`, so every jsonl file in the repository classifies as null today, and akasha keeps its row data in jsonl beside-files. `.mjs` and `.cjs` fall through to null the same way. `.bash` falls through because only `.sh` is tested.\n\nThe classifier is live code with five importers outside akasha: tools/lib/check-workflow/prose-mechanism-restatement.ts:1, tools/lib/check-workflow/bare-ts-population-seeds.ts:1, tools/lib/graph/producers/file/file-kind-authorship.ts:10, infra/cluster-checks/src/checks/check-shellcheck.ts:6 and infra/cluster-checks/src/checks/check-healthkit-read-only.ts:5. It has no equivalent inside akasha; `akasha/file/file.domain.ts` states only that every file is a page or one page property\'s own file, which makes an extension a value in a file property\'s type union rather than a thing with a page.\n\nSo `pages/file-kind` is not the redundant half of a pair. It is the more complete half. I left all 33 in place.',
} as const satisfies Finding
