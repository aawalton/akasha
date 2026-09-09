import type { Module } from "@akasha/code/module"
import type { PageType } from "../types/page-type.page-type.ts"

export type ComputedPropertyModule = Module

export const computedPropertyModule = {
  id: "01a08202-ae3b-7dad-afcb-d0ad4adc1214",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "computed-property-module",
  definition: "a module holding the functions calculations share",
  pluralSlug: "computed-property-modules",
  extends: ["page-type/module"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A function more than one calculation runs sits in a computed-property-module.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation reaches such a function by importing that module's code file.",
    },
    {
      invariantKind: "departure",
      statement: "That import is resolved while a calculation's text is run.",
    },
    {
      invariantKind: "departure",
      statement:
        "This module's own code imports types and other computed-property-modules and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "Code that is no calculation imports this module as that code imports any module.",
    },
  ],
} as const satisfies PageType
