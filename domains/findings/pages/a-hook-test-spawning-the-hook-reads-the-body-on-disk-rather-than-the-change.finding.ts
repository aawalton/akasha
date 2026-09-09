import type { Finding } from "../finding.page-type.types.ts"

export const aHookTestSpawningTheHookReadsTheBodyOnDiskRatherThanTheChange = {
  id: "01a081c6-fcd3-7912-a592-7d178669dfbc",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-hook-test-spawning-the-hook-reads-the-body-on-disk-rather-than-the-change",
  domain: "hook-system",
  claim:
    "A hook test that runs the hook as a subprocess cannot assert wording the same change introduces, because the subprocess reads the code file from disk while the checks judge the change's own body. The two roads through one hook disagree for the length of every rename, and the disagreement reads as a test that is simply wrong.",
  evidence:
    'Measured 2026-09-08 while landing ec928bd0d1, which repointed the hook refusals at `akasha change draft` and `akasha change apply`. `block-biome.agent-hook.test.ts:124` and `block-bun-test.agent-hook.test.ts:141` each build a payload, run `ran(["bun", SCRIPT], ...)` and assert over the `reason` the hook prints. The first apply refused: the received text was verbatim the old `akasha change` and `akasha apply` wording, while the in-process assertions in the same two files, at lines 24 and 26, passed against the new wording. Same file, same change, two answers. The subprocess is spawned against `join(import.meta.dir, "<hook>.agent-hook.code.ts")`, which is the checkout, and a change is judged before it lands, so no ordering of the edits closes the gap. Both lines were set to a clause the rename does not touch, `The linter runs at the change.` and `The tests run at the change.`, which still proves the refusal names where each runs. Every hook carrying a stdin test of its printed reason has the same shape: block-akasha-edits, block-akasha-shell-writes, block-combined-akasha-calls and block-git-writes all spawn themselves. Nothing refuses such an assertion when it is written, so the next agent renaming a hook\'s words meets it as a failing test rather than as a known wall.',
} as const satisfies Finding
