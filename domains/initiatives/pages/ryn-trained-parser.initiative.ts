import type { Initiative } from "../initiative.page-type.ts"

export const rynTrainedParser = {
  id: "01a06d30-4bca-74a1-b610-dcc27a519d56",
  pageTypeSlug: "initiative",
  slug: "ryn-trained-parser",
  domainSlug: "workspace-package/domain",
  personaSlug: "ryn",
  intents: [
    {
      statement: "Every sentence akasha writes is parsed into a dependency tree.",
      workingMemory:
        "The parser is landed: the compact-parser page, its four file properties and the four weight files beside it, read through onnxruntime-node from a fork of writinglint-parser-node under MIT. What is parsed is invariant statements alone, because Alan scoped this campaign to invariants for now. Definitions, directives and help notes are sentences akasha writes that nothing parses, so this widens when he says so.",
    },
    {
      statement: "Whether akasha writes in the passive is decided.",
      workingMemory:
        "43.5% of akasha's invariant statements are passive. The tree marks this cleanly as aux:pass, so a predicate is two lines. The decision is Alan's, and no other single shape reaches as many statements.",
    },
    {
      statement: "Every invariant under akasha is written in plain language.",
      workingMemory:
        "Every invariant under akasha passes the join gate, the reason gate and the five sentence shapes: 26,108 statements parsed and none refused. What the parser taught the rewrites: a bare `one`, `the rest`, `both`, `each one` and `all` read as quantifiers, and repeating the head noun clears them; the numeral word `one` trips where the digit 1 does not; `any one of` and `every one of` trip as partitive; a thousands separator inside a numeral reads as a comma join.",
    },
  ],
  constraints: [
    "The parser is owned as a package in this repository rather than taken as a live upstream dependency.",
    "The model weights are an uncommitted file property, colocated and never committed.",
    "A shape's predicate is a file property exporting one function of a type every shape shares.",
    "A statement is parsed alone, because batching moved the tree on 95 of 300 sentences.",
    "A trained model commits to one tree rather than ranking several trees.",
    "one by one is acceptable.",
    "A relative `that` is not a lone pronoun.",
    "A sentence shape is put to Alan only where it is proposed for acceptance.",
    "A remediation change that only rewords is landed as restated rather than as authored.",
    "A remediation change deleting a clause is landed as authored.",
    "A remediation landing carries one file, so agents contend on the gate rather than on each other.",
    "Twenty agents remediate at once.",
    "A statement an agent cannot rewrite is left as it is and handed back to ryn.",
  ],
} as const satisfies Initiative
