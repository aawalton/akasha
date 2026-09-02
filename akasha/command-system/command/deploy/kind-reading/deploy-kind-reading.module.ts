import type { Module } from "@akasha/code-system/module"

export const deployKindReading = {
  id: "01a05f90-94a7-7fc2-9a67-8a23a3e65539",
  pageTypeSlug: "module",
  slug: "deploy-kind-reading",
  definition: "the kind of app a slug names, with the page carrying that slug",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug is looked for among the web app pages and the ios app pages alike.",
    },
    {
      invariantKind: "departure",
      statement: "A web app page is found by the suffix its filename carries.",
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
      statement: "A slug both kinds carry is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A slug neither kind carries is refused by naming what each kind has.",
    },
    {
      invariantKind: "departure",
      statement: "A git that will not list the pages refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "Ios app pages that will not read refuse the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says how an app of either kind is put up.",
    },
  ],
} as const satisfies Module
