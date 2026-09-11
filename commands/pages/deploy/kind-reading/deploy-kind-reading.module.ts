import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const deployKindReading = {
  id: "01a05f90-94a7-7fc2-9a67-8a23a3e65539",
  type: "module",
  slug: "deploy-kind-reading",
  definition: "the kind of thing a slug names, with the page carrying that slug",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug is looked for among the pages of every kind a deploy puts up.",
    },
    {
      invariantKind: "departure",
      statement:
        "The kinds are the web app, the ios app, the three services, the container recipe and the addon.",
    },
    {
      invariantKind: "departure",
      statement: "A page of any kind but the ios app is the page the index answers for that slug.",
    },
    {
      invariantKind: "departure",
      statement: "An ios app is found among the apps the mobile commands already read.",
    },
    {
      invariantKind: "departure",
      statement: "An ios app is named by the slug its page states rather than by its filename.",
    },
    {
      invariantKind: "departure",
      statement: "The ios apps are read from the checkout this code is in.",
    },
    {
      invariantKind: "departure",
      statement: "The web apps are read from the root the caller gave.",
    },
    {
      invariantKind: "departure",
      statement: "One slug may be carried by a page of each kind.",
    },
    {
      invariantKind: "departure",
      statement: "A slug more than one kind carries is refused by naming every page that has it.",
    },
    {
      invariantKind: "departure",
      statement: "A slug a web app page and a cluster service page both carry names the web app.",
    },
    {
      invariantKind: "departure",
      statement: "That pair is the only one settled rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no kind has is refused by naming the slugs each kind has.",
    },

    {
      invariantKind: "departure",
      statement: "Ios app pages that will not read refuse the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says how an app of either kind is put up.",
    },
    {
      invariantKind: "departure",
      statement: "A container recipe is a fifth kind a slug may name.",
    },
    {
      invariantKind: "departure",
      statement: "An inference service is a sixth kind a slug may name.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO addon is a seventh kind a slug may name.",
    },
    {
      invariantKind: "departure",
      statement: "A kind's own name is read as every page of that kind rather than as one page.",
    },
    {
      invariantKind: "departure",
      statement: "The page a whole kind is read at is that kind's own page type page.",
    },
    {
      invariantKind: "departure",
      statement: "A slug one workstation service carries is refused by naming that kind.",
    },
  ],
} as const satisfies Module
