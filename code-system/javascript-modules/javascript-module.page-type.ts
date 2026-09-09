import type { PageType } from "@akasha/pages/page-type"
import type { Domain } from "akasha/domains/domain.page-type.ts"
import type { Javascript } from "./properties/javascript.code-file-property.ts"

export type JavascriptModule = Domain & {
  javascript: Javascript
}

export const javascriptModule = {
  id: "01a06954-f7db-7006-ba1c-605a60e17fab",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "javascript-module",
  definition: "code in the JavaScript language",
  pluralSlug: "javascript-modules",
  parts: ["code-file-property/javascript"],
  extends: ["page-type/domain"],
  properties: [{ pageProperty: "code-file-property/javascript", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A JavaScript module's code is in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "JavaScript runs under whatever runtime loads that JavaScript rather than under TypeScript's.",
    },
    {
      invariantKind: "departure",
      statement:
        "A JavaScript module is written as the runtime loading that module reads that module.",
    },
    {
      invariantKind: "departure",
      statement:
        "The code carrying a JavaScript module to its runtime states the name that module lands under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A JavaScript module reaches its siblings by the name a sibling has where that sibling runs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing in akasha imports a JavaScript module.",
    },
    {
      invariantKind: "absence",
      statement: "No check reading TypeScript reads a JavaScript module.",
    },
  ],
} as const satisfies PageType
