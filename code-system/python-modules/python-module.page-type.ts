import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Python } from "./properties/python.file-property.ts"

export type PythonModule = Domain & {
  python: Python
}

export const pythonModule = {
  id: "01a06815-9efd-7001-8696-539b1123a2c0",
  pageTypeSlug: "page-type",
  slug: "python-module",
  definition: "code in the Python language",
  pluralSlug: "python-modules",
  partSlugs: ["file-property/python"],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "python", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A Python module's code is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Python runs where a Python runtime stands rather than where TypeScript runs.",
    },
    {
      invariantKind: "departure",
      statement: "A Python module reaches its siblings by the name each carries where it runs.",
    },
    {
      invariantKind: "departure",
      statement: "What carries a Python module to where it runs states the name it lands under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing in akasha imports a Python module.",
    },
  ],
} as const satisfies PageType
