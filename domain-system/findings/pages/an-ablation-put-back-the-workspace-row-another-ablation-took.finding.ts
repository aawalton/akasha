import type { Finding } from "../finding.page-type.ts"

export const anAblationPutBackTheWorkspaceRowAnotherAblationTook = {
  id: "01a062a7-8a88-74e8-a678-cf0478f894ae",
  pageTypeSlug: "finding",
  slug: "an-ablation-put-back-the-workspace-row-another-ablation-took",
  domainSlug: "domain/temper",
  claim:
    "`akasha remove` writes the root manifest's `workspaces` list back whole from the base commit it was called against, and nothing compares that list to the list at HEAD. An ablation landing after a sibling therefore restores the row the sibling deleted. The tree then names a workspace no directory holds, and every `bun install` refuses tree-wide. Neither seat did anything wrong: both carried a parsed importer census. The tool has to catch this, because a dozen agents ablate here at once.",
  evidence:
    '`c7d9fa364f` ablated `temper/game-items-addon` and its diff on the root manifest is one line, `-"temper/game-items-addon"`. `7a55e01b8b` ablated `temper/game-characters-stats` two commits later and its diff on the same file is `-"temper/game-characters-stats"` beside `+"temper/game-items-addon"`, in one hunk. The second seat asked for one row and landed two changes. At the commit where this was found, `bun install --frozen-lockfile --dry-run` answered `error: Workspace not found "temper/game-items-addon" at package.json:68:5`, and `git ls-files temper/game-items-addon` answered 0. Reading the failing tool\'s own line number is what found it; a hypothesis about a removal leaving a dangling workspace dependency had been checked first and was wrong, no manifest naming either package. The list holds 90 entries naming a fixed path, and exactly one of them points at a directory holding no tracked file, so this is a single lost update rather than a pattern. The census counted tracked files per row rather than testing the directory, because an ablated folder keeps a `node_modules` shell and any `existsSync` reading scores a torn-down package as present.',
} as const satisfies Finding
