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
        "The parser is forked from writinglint-parser-node under MIT: an INT8 ONNX model read through onnxruntime-node. The dependency graph and the word pieces already landed as modules of plain-language. What is left is the onnx-parsing module and four weight files, staged at /tmp/dp, which land as an uncommitted file property of a local parser-model page type. The lockfile no longer blocks this: runs-file-length is false on the lockfile property.",
    },
    {
      statement: "The check refuses a statement by the predicate a refused shape holds.",
      workingMemory:
        "A blocklist: plain is no refused shape matched. The check already runs each refused shape's predicate and names the shape in its refusal. It judges nothing because every phase is off: patch went off at e57ecc0deb until the loose shapes are settled. The predicates refused 1,228 of 24,553 statements: lone-quantifier 955, lone-pronoun 167, partitive-quantifier 128, lone-determiner 36, closing-count 10, one statement two shapes refuse counted once. The partitive fell to 105 at 984bae5f93.",
    },
    {
      statement: "The shapes akasha refuses are rebuilt on the dependency tree.",
      workingMemory:
        "Four shapes were carried over and closing-count makes five, each with a predicate and a test. Forty-eight admitted shapes went. Every one is measured over the tree now, and every one answers a seeded control. No invariant holds a free relative. All 167 lone-pronoun matches are pronouns whose noun sits in the same sentence, and whether the shape goes on refusing those is Alan's.",
    },
    {
      statement: "Whether akasha writes in the passive is decided.",
      workingMemory:
        "43.5% of akasha's invariant statements are passive, and the grammar caught none of them. The tree marks this cleanly as aux:pass, so a predicate is two lines. The decision is Alan's, and no other single shape reaches as many statements.",
    },
    { statement: "Every sentence shape akasha holds carries a decision." },
    { statement: "A sentence akasha refuses names the shape it is refused for." },
    { statement: "A change writing a sentence akasha refuses does not land." },
    { statement: "The phrase grammar and the word lexicon are gone." },
    {
      statement: "Every invariant under akasha is written in plain language.",
      workingMemory:
        "Two families are left. 167 statements match lone-pronoun, every one on a pronoun whose noun sits in the same sentence, and that family waits on Alan. 135 statements run past the 100-character maximum their own property declares. Read rather than counted, they are three jobs: 59 to reword, 47 carrying a reason clause that simply goes, and 29 that are two claims to split.",
    },
  ],
  constraints: [
    "The parser is owned as a package in this repository rather than taken as a live upstream dependency.",
    "The model weights are an uncommitted file property, colocated and never committed.",
    "A shape's predicate is a file property exporting one function of a type every shape shares.",
    "A shape is found by a predicate over the dependency tree rather than by a rule over word classes.",
    "Only the shapes already defined as refusals were carried over, and the rest are rebuilt on the new foundation.",
    "A statement is parsed alone, because batching moved the tree on 95 of 300 sentences.",
    "A trained model commits to one tree rather than ranking several trees.",
    "one by one is acceptable.",
    "A relative `that` is not a lone pronoun.",
    "Alan is shown one thing at a time.",
    "A sentence shape is put to Alan only where it is proposed for acceptance.",
    "A remediation change that only rewords is landed as restated rather than as authored.",
    "A remediation change deleting a clause is landed as authored.",
    "A remediation landing carries one file, so agents contend on the gate rather than on each other.",
    "Twenty agents remediate at once.",
    "A statement an agent cannot rewrite is left as it is and handed back to ryn.",
  ],
} as const satisfies Initiative
