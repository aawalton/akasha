import type { Module } from "../../code-system/module/module.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Needs } from "./properties/needs.page-property-type.ts"
import type { RunsOn } from "./properties/runs-on.page-property-type.ts"

export type Check = Module & {
  needs: Needs
  runsOn: RunsOn
}

export const check = {
  id: "01a04bc4-7e86-7beb-8dfb-3666785dd3d5",
  pageTypeSlug: "page-type",
  slug: "check",
  definition: "a module run over a change to judge whether it may land",
  extendsSlug: "page-type/module",
  design: [
    {
      invariantKind: "departure",
      statement: "A check is handed what it says it needs and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A check judges the code, never its author.",
    },
    {
      invariantKind: "departure",
      statement: "A check takes and gives paths under the root it was given.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "A check looks for no files.",
    },
    {
      invariantKind: "gap",
      statement:
        "A check that must know more than the change it was handed asks the index, never the tree.",
    },
  ],
  rule: [
    {
      name: "Alan Approves",
      act: "Add a check to akasha only where Alan has approved that check.",
      warrant:
        "A check binds every writer on every change, and a wrong one costs more than what it guards.",
      aids: [
        "Approving the initiative is not approving a check.",
        "A check replacing an old one still needs approval.",
      ],
    },
    {
      name: "Fail Closed",
      act: "Fail a check that could not run.",
      warrant:
        "A check that could not look verified nothing, so passing it lets a change land unjudged.",
      aids: [
        "A check that threw could not run.",
        "Never answer for a check by catching its error.",
      ],
    },
    {
      name: "Zero At Landing",
      act: "Fix every violation a new check finds before landing it, never freezing the ones left into a list.",
      warrant:
        "The check reads green while every defect it found is still there, so it blocks nobody.",
      aids: [
        "Never narrow its reach to make the count zero.",
        "Where zero is out of reach, do not land it.",
      ],
    },
  ],
} as const satisfies PageType
