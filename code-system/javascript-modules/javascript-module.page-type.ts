import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Javascript } from "./properties/javascript.file-property.ts"

export type JavascriptModule = Domain & {
  javascript: Javascript
}

export const javascriptModule = {
  id: "01a06954-f7db-7006-ba1c-605a60e17fab",
  pageTypeSlug: "page-type",
  slug: "javascript-module",
  definition: "code in the JavaScript language",
  pluralSlug: "javascript-modules",
  partSlugs: ["file-property/javascript"],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "javascript", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A JavaScript module's code is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "JavaScript runs under whatever runtime loads it rather than under TypeScript's.",
    },
    {
      invariantKind: "departure",
      statement: "A JavaScript module is written as the runtime loading it reads it.",
    },
    {
      invariantKind: "departure",
      statement:
        "What carries a JavaScript module to where it runs states the name it lands under.",
    },
    {
      invariantKind: "departure",
      statement: "A JavaScript module reaches its siblings by the name each carries where it runs.",
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
