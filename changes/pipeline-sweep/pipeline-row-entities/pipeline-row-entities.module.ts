import type { Module } from "@akasha/code-system/module"

export const pipelineRowEntities = {
  id: "01a0686c-e937-7008-8be5-1507d10c5826",
  pageTypeSlug: "module",
  slug: "pipeline-row-entities",
  definition: "a pipeline, workflow and step page row read as what the sweep decides over",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row stating no whole-number seq is no entity.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow or step naming no parent is no entity.",
    },
    {
      invariantKind: "departure",
      statement: "A row stating no status stands as pending.",
    },
    {
      invariantKind: "departure",
      statement: "A value stated as blank or as whitespace alone is read as unstated.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow or step stating no name is named by its seq.",
    },
    {
      invariantKind: "departure",
      statement: "A moment that does not parse is read as unstated rather than as zero.",
    },
    {
      invariantKind: "departure",
      statement: "A flag is the boolean a page states rather than the word `true`.",
    },
    {
      invariantKind: "departure",
      statement: "A count is the number a page states rather than digits in text.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key takes the spelling the page type declares rather than the spelling markdown used.",
    },
  ],
} as const satisfies Module
