import type { Finding } from "../finding.page-type.ts"

export const everyAblationLandsUngatedBecauseRemoveDeclaresItselfMechanical = {
  id: "01a06897-0778-7408-8c0d-a451b79b1f20",
  pageTypeSlug: "finding",
  slug: "every-ablation-lands-ungated-because-remove-declares-itself-mechanical",
  domainSlug: "domain/akasha-migration",
  claim:
    '`akasha remove` declares `changeKindSlug: "change-mechanical"`, a kind that runs no check and no warrant, so every ablation the swarm lands is judged by nothing — and an ablation is the one change most able to break a consumer.',
  evidence:
    "`akasha/command-system/commands/remove/remove.command.ts:11` reads `changeKindSlug: \"change-mechanical\"`. `change-mechanical.change-kind.ts:7-9` reads `definition: \"a change composed by a program\"`, `runsChecks: false`, `runsWarrants: false`. Removing five files tonight, the answer said so itself: `a change-mechanical change runs no check, so this landing was judged by none`.\n\nThe same answer names the blind spot that makes the gap bite: `a body building a path out of pieces is not found here`. That is not hypothetical. The three files taken away in that commit were reached by exactly such a body — `tools/ops/tool-forward.ts:13-16` builds `${root}/tools/${name}.ts` from a template literal, and `tools/ops/forwarders.ts:16-31` finds the file by `readdirSync` over `tools/` plus a regex over each file's CONTENT, never by name. No file in the repository spelled `tools/dag.ts`, `tools/declarations.ts` or `tools/unreached.ts` outside those three files' own help text, yet `ops domain dag`, `ops domain declarations` and `ops domain unreached` were all live commands. `akasha remove`'s own sweep could not have seen a single one of them.\n\nSo the tool's reader sweep and the tool's gating both stop short of the reader class that caused the outages. `9b4a045e32` took these same three files away and `bcf1beed59` put them back; the finding at `three-domain-tools-were-taken-away-as-carried-and-akasha-carries-none.finding.ts:11` records that four reconnaissance passes judged them absent and they were taken away anyway.\n\nWhat is filed rather than fixed: raising `remove` to a kind that runs checks changes gating for every lane mid-migration, which is a call about what the suite refuses rather than a defect to repair inline.",
} as const satisfies Finding
