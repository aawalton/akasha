import type { Finding } from "../finding.page-type.ts"

export const theGateRunsUnlandedCodeToJudgeAChange = {
  id: "01a05dde-a390-7000-9785-78fcf54b37fb",
  pageTypeSlug: "finding",
  slug: "the-gate-runs-unlanded-code-to-judge-a-change",
  domainSlug: "workspace-package/checks",
  claim:
    "`no-refused-syntax` executes the body a change carries. Where a change introduces a `*.syntax-rule.code.ts` at a path nothing on disk holds, `rulesIn` compiles that carried text and runs it through `new Function` with a live `createRequire`, before the change has landed and while the check is deciding whether it may. Judging a change and running it are one act here.",
  evidence:
    "Read at `akasha/checks-system/code-check/no-refused-syntax/no-refused-syntax.code-check.code.ts`. `compiledFrom` at 42-63 transpiles the text it is handed to CommonJS and runs it through `new Function` taking `require`, `module`, `exports`, `__filename` and `__dirname`, called with `createRequire(full)`. The body therefore reaches every module the repository can load, and the filesystem and network besides.\n\n`rulesIn` at 85-93 takes that branch wherever `shadow.codeAt(beside)` answers null, handing `compiledFrom` the answer of `introducedIn(change, beside)` — the after-body the change carries for a path holding no before-body.\n\nSo a change adding a new syntax rule has that rule's body executed by the check deciding whether the change may land. Nothing here is a bypass: `--break-the-glass` is not involved and this is the ordinary patch path. The gate runs what it is gating.\n\nThe exposure is not only a hostile body. A new rule body that loops without end, writes a file, or reaches the network does so on the machine of whoever is landing, at patch time, before any reader has seen it.\n\nThis was introduced deliberately at `2903736a2f` to answer half of `a-syntax-rules-own-body-cannot-be-changed-through-the-gate`, which asks for more of it — that a rewritten rule be judged by its carried body too. That finding treats the mechanism as the fix and does not weigh what it costs. Filed apart rather than added there, because the two claims point opposite ways.\n\nNot established here: whether any caller reaches `rulesIn` with a change from a source the machine does not trust, and whether the audit path reaches the same branch.",
} as const satisfies Finding
