import type { Finding } from "../finding.page-type.ts"

export const noRuleInTwoFilesRefusesTheRemedyItNames = {
  id: "01a060f3-ad30-7805-a80b-2ef41bc2dcd0",
  pageTypeSlug: "finding",
  slug: "no-rule-in-two-files-refuses-the-remedy-it-names",
  domainSlug: "workspace-package/checks",
  claim:
    "`no-rule-in-two-files` says one rule belongs in one file, reached by importing it, and yet a file doing exactly that is refused all the same. A rule's fingerprint leaves out the function's own name and keeps an imported name as its text, so twenty files each holding `return shared()` are twenty copies of one rule. Clearing it wants each caller to hand in something of its own.",
  evidence:
    "`akasha/code-system/code-rule/code-rule.module.code.ts:27` builds a rule as the parameter list, then `=>`, then the body's token stream. `bound` at line 10 renumbers only what the function binds, its parameters and its own variable declarations, to `$0` and `$1`. An imported name is kept as its text, and the declaration's own name never enters the stream: `speltIn` at line 57 carries `name` beside `rule`, and `no-rule-in-two-files.code-check.code.ts:37` groups on `rule` alone.\n\nMeasured over 38 temper command code files, 25 saying the inventory rules code is not in akasha yet and 13 saying the reader of the addon's saved variables is not. Every one was byte-identical to its family apart from the name it exported. A command is resolved through `mod[exportedAs(slug)]` at `akasha/command-system/calling/calling.module.code.ts:103`, and `code` is required by the module page type, so each command must carry its own file exporting its own function. Rewriting all 38 as `return withoutTheRuleStore()` around one shared module would have left 38 identical rules and 38 refusals.\n\nWhat cleared them was handing each command's slug to the shared refusal, which also made the answer name the command that refused, where before two commands of one family were indistinguishable. So the check was right about these files. Where a set of adapters genuinely holds nothing of its own to hand in, this check has no clearing move.",
} as const satisfies Finding
