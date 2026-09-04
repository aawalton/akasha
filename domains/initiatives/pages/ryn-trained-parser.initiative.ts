import type { Initiative } from "../initiative.page-type.ts"

export const rynTrainedParser = {
  id: "01a06d30-4bca-74a1-b610-dcc27a519d56",
  pageTypeSlug: "initiative",
  slug: "ryn-trained-parser",
  domainSlug: "workspace-package/domain-system",
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
        "A blocklist: plain is no refused shape matched. The check runs on patch alone today, and refuses nothing at all, because no shape states rules and the grammar built from rules is empty. Measured rather than reasoned: every sentence answers plain false with shape null, which the check reads as a grammar gap and passes.",
    },
    {
      statement: "The shapes akasha refuses are rebuilt on the dependency tree.",
      workingMemory:
        "Four shapes carried over, each with a predicate and a test: lone-pronoun, lone-determiner, lone-quantifier, partitive-quantifier. Forty-eight admitted shapes went. The old grammar had almost no power: six of nine shapes tested had no control at all, because the lexicon gave every word ending in ed four word classes and a second parse always reached the sentence another way.",
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
    { statement: "Every invariant under akasha is written in plain language." },
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
  ],
} as const satisfies Initiative
