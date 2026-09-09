import type { Finding } from "../finding.page-type.types.ts"

export const theGateRunsUnlandedCodeToJudgeAChange = {
  id: "01a05dde-a390-7000-9785-78fcf54b37fb",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "the-gate-runs-unlanded-code-to-judge-a-change",
  domain: "workspace-package/check",
  claim:
    "`no-refused-syntax` executes the body a change carries. Where a change carries a `*.syntax-rule.code.ts` body no path on disk holds, whether the rule is new or rewritten, `rulesIn` compiles that carried text and runs it through `new Function` with a live `createRequire`, before the change has landed and while the check is deciding whether it may. Judging a change and running it are one act here.",
  evidence:
    "Read at `checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.code.ts`. `compiledFrom` at 40-61 transpiles the text it is handed to CommonJS and runs it through `new Function` taking `require`, `module`, `exports`, `__filename` and `__dirname`, called with `createRequire(full)`. The body therefore reaches every module the repository can load, and the filesystem and network besides.\n\n`rulesIn` takes that branch at 83-96, wherever `shadow.codeAt(beside)` answers null, handing `compiledFrom` the answer of `carriedIn(change, beside)` — the after-body the change carries for that path, whatever the path held before.\n\nSo a change that adds a syntax rule, and a change that rewrites one, each have that rule's body executed by the check deciding whether the change may land. Nothing here is a bypass: `--break-the-glass` is not involved and this is the ordinary patch path. The gate runs what it is gating.\n\nThe exposure is not only a hostile body. A rule body that loops without end, writes a file, or reaches the network does so on the machine of whoever is landing, at patch time, before any reader has seen it.\n\nHow far the branch reaches: written at `2903736a2f` for a rule the change introduces, where `carriedIn` still answered null for a path holding a before-body; widened at `ce605830f7`, which dropped that guard so a rewrite of a rule already landed takes the branch too. `2870778179` is the first such rewrite. The check's own page states this as a gap: a rule body the change carries is run before anyone has read that body.\n\nNot established here: whether any caller reaches `rulesIn` with a change from a source the machine does not trust, and whether the audit path reaches the same branch.",
} as const satisfies Finding
