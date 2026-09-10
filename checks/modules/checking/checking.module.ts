import type { Module } from "@akasha/code/module"

export const checking = {
  id: "01a04bc4-7e86-7df4-a322-36cc3b789fce",
  pageTypeSlug: "module",
  type: "module",
  slug: "checking",
  definition: "every check gathered and run over one change, answering what refuses it",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A check's page names the export the check runs.",
    },
    {
      invariantKind: "departure",
      statement: "The checks are found in the index.",
    },
    {
      invariantKind: "departure",
      statement: "A model check is gathered here beside the code checks.",
    },
    {
      invariantKind: "departure",
      statement: "A count of runs above zero is the phase a model check runs on.",
    },
    {
      invariantKind: "departure",
      statement: "Finding the checks costs nothing the pages grow.",
    },
    {
      invariantKind: "departure",
      statement: "A missing index refuses rather than reading as an index naming nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming no check refuses the change the index would leave unjudged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check is run once over the change the check was given rather than over the pages.",
    },
    {
      invariantKind: "departure",
      statement: "A check no changed path is input to does not run.",
    },
    {
      invariantKind: "departure",
      statement: "A check the change takes away runs over no part of that change.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check is taken away where the change takes away the check's page or the code beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "A change taking away every check is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A check's code is loaded from the tree rather than from the change.",
    },
    {
      invariantKind: "departure",
      statement: "A check whose own code file is there is loaded from that file.",
    },
    {
      invariantKind: "stopgap",
      statement: "A check without one is loaded from the code its module page names.",
    },
    {
      invariantKind: "departure",
      statement: "The file a check was loaded from is the file taking that check away.",
    },
    {
      invariantKind: "departure",
      statement: "A check whose audit code file is there is gathered with that audit beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A check without one is gathered with no audit rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "An audit file answering to nothing that can be run refuses the whole run.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed a root runs each check's audit over that root.",
    },
    {
      invariantKind: "departure",
      statement: "A check with no audit beside it is run over the change even there.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no root runs every check over the change.",
    },
    {
      invariantKind: "departure",
      statement: "A run over a subset of the files is a run over a change rather than an audit.",
    },
    {
      invariantKind: "departure",
      statement: "A check stating no input runs for every change.",
    },
    {
      invariantKind: "departure",
      statement: "A check whose input could not be answered runs.",
    },
    {
      invariantKind: "departure",
      statement: "One shadow is cast over the change here and handed to every check.",
    },
    {
      invariantKind: "departure",
      statement: "One run id is minted for each change judged.",
    },
    {
      invariantKind: "departure",
      statement: "Every check judged over one change has one run id.",
    },
    {
      invariantKind: "departure",
      statement: "A run id is a uuid version 7.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow that could not be worked out refuses the change before any check runs.",
    },
    {
      invariantKind: "departure",
      statement: "Why a check page or its code would not load is carried into the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A check that threw refuses the change the check could not judge.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is marked as a check that could not run.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the check's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the file and line the fault was thrown at.",
    },
    {
      invariantKind: "departure",
      statement: "The file and line are said before the fault's message.",
    },
    {
      invariantKind: "departure",
      statement: "A frame the fault was called from is named after the fault's message.",
    },
    {
      invariantKind: "departure",
      statement:
        "A frame repeating the file the frame before named is said by line and column alone.",
    },
    {
      invariantKind: "departure",
      statement: "The frames end where the fault reaches the runner here.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is handed to every check.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away reads there as a path whose body is nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Audit is the same run over every path the index files including page and property files alike.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path is taken from the index rather than worked out here from the property names above a file.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read out of the change by name as well as in turn.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check needing a path the check was not handed reads the change's body rather than the disk's.",
    },
    {
      invariantKind: "gap",
      statement: "A check the change adds runs over that change.",
    },
    {
      invariantKind: "gap",
      statement: "A check whose code the change alters runs as the change leaves that code.",
    },
  ],
} as const satisfies Module
