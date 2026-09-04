import type { Finding } from "../finding.page-type.ts"

export const theCompletionAddOnsFourGeneratedTablesLeftTheirDirectiveBehind = {
  id: "01a0638f-be41-74da-80fd-80871b6eb6b6",
  pageTypeSlug: "finding",
  slug: "the-completion-add-ons-four-generated-tables-left-their-directive-behind",
  domainSlug: "domain/temper",
  claim:
    "Each of the four generated tables under `temper/player-completion-addon/src/generated/` carried the directive `DO NOT EDIT — regenerate with: ops temper addon-data generate`. All four went down with the folder and no akasha page carries the directive, because the akasha check `no-code-comments` refuses a header banner as prose.",
  evidence:
    "Read at 29d5251309^. `companion-mappings.generated.ts:7` at 722 bytes, `motif-style-lookup.generated.ts:13` at 14,079 bytes, `scribing-sources.generated.ts:7` at 10,694 bytes and `skill-mappings.generated.ts:7` at 4,385 bytes each carry that line. The command the directive names is spelled for the old CLI; akasha spells it `akasha temper-addon-data-generate`.\n\nOnly one of the four is read by the akasha add-on, and it landed without the header: `SCRIBING_SOURCES` is at `akasha/temper/temper-characters-addon/characters-scribing-source-table/characters-scribing-source-table.module.code.ts`, whose first line is an import. `no-code-comments.code-check.code.ts:136-140` answers `a directive nothing declares` for a comment it can parse and `prose` for one it cannot, and refuses either, so a banner cannot cross as a comment. Nothing carries it as an exported string either.\n\nThe other three are recorded elsewhere: `two-generated-tables-in-the-completion-addon-are-copies-nothing-writes` for the two the codegen never wrote here, and `the-motif-rows-under-a-task-go-with-the-generated-motif-style-catalog` for the motif catalog that has no akasha home. This finding is the directive rather than the data.",
} as const satisfies Finding
