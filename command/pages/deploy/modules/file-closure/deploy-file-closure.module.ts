import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployFileClosure = {
  id: "01a09196-9c2c-732f-bd4f-d1f618fae23a",
  type: "page-type/module",
  slug: "deploy-file-closure",
  definition: "the files building the artifact a deploy puts up",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy is built from the files it is seeded with and every file those reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind is seeded with the tracked files under the folder its page sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app is seeded as well with the folder its page names as its source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A web app is seeded as well with its cluster service, its manifest and that manifest's code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A web app whose cluster service states a manifests file is seeded with that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service is seeded as well with its manifest and that manifest's code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ios app is seeded as well with the files every ios app build shares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workstation service is seeded as well with the code its unit's command runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a kind's own reader refuses is seeded with the files beside it alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is reached by asking the graph what that file reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file reached through another file reached is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the imports reach that git does not track is reached by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is reached whether or not git tracks that seed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are read out of the commit being put up rather than off the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which files git tracks is read out of that commit's tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The paths a container recipe copies out of its context are seeded here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy reaching the page of an image is seeded with that image's recipe and what it copies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder a recipe copies is seeded as the tracked files under that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a stage copies out of an earlier stage seeds nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only an image a repository is named for has its recipe read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a deploy does with the files it is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app's image holds the files its build reaches and none other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Those files take in what a glob in an import matches and what a stylesheet imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those files are reached again from every file carried, until no new file comes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal holds back every service built from a file in the folder it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The closures narrow to the services a deploy would restart, and to no others.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal naming what no service is built from holds back every service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One reading of a commit builds every closure asked of it, reading each body once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every tracked file in a folder a deploy is built from is carried with that deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test is carried only where the folder it sits in holds a file being judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test beside no file being judged is run by nothing and imported by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test the deploy is built from is carried whatever folder that test sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The types written for a page are reached by no addon, and neither is whatever only they reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An addon is built from no file generated beside a page, though every other kind still is.",
    },
  ],
} as const satisfies Module
