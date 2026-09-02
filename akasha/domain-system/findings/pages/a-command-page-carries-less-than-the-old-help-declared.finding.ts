import type { Finding } from "../finding.page-type.ts"

export const aCommandPageCarriesLessThanTheOldHelpDeclared = {
  id: "01a0603f-86ce-7087-8be6-fd49fa6631ad",
  pageTypeSlug: "finding",
  slug: "a-command-page-carries-less-than-the-old-help-declared",
  domainSlug: "workspace-package/command-system",
  claim:
    "The old ops commands declared their surface as structured data a program could read: which arguments are required, which are positional, which values a flag accepts, what a flag defaults to, which flags exclude each other, and what each fault code means. An akasha command page carries only `said` and `takes`, both free text. Recreating temper's 66 commands folded all of that into `helpNotes` prose, so nothing can check it and nothing can parse arguments from it.",
  evidence:
    "`tools/ops/surface.ts` declares `CommandHelp` with `positionals`, `flags`, `mutuallyExclusive`, `envVars`, `exits` and `examples`, and each flag carries `required`, `default`, `choices`, `repeat`, `acceptsStdin`, `valueShape`, `path` and `aliases`. `tools/lib/parse-args.ts` reads that declaration and does the parsing, so a command's code never restates what it takes.\n\n`akasha/command-system/command/properties/taking.record-property.ts` declares two fields, `said` and `takes`, each free text capped at 100 characters. `akasha/command-system/command/properties/help-notes.text-property.ts` is one 200-character line of prose. Nothing else on the page carries argument structure, and `akasha/command-system/calling/calling.module.code.ts` only pads and prints what `taking` holds.\n\nWhat was lost per command, counted over the 66: 24 declare exit-code meanings, 8 declare environment variables, 2 declare mutually exclusive sets, 21 declare a flag with enumerated values, 9 declare a flag default, 20 declare a positional as distinct from a flag, and 14 declare a flag as required. Every one of these is now a sentence in `helpNotes` that a reader can follow and a program cannot.\n\nThe consequence shows in the code: each recreated command must parse its own arguments and restate its own rules, which is what the `taking` page says should not happen — `Its code states only how what was said is worked out`. With no structure on the page there is nothing for a shared parser to read.",
} as const satisfies Finding
